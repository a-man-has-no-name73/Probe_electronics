import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { 
      user_name, 
      phone_number,
      payment_type,
      transaction_number, 
      transaction_phone_number,
      address,
      institution,
      quantity
    } = body

    // Basic validation
    if (!phone_number) {
      return Response.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    if (!payment_type || !['cod', 'bkash', 'nagad'].includes(payment_type)) {
      return Response.json(
        { error: 'Valid payment type is required (cod, bkash, or nagad)' },
        { status: 400 }
      )
    }

    // Validate quantity
    const orderQuantity = parseInt(quantity) || 1
    if (orderQuantity < 1) {
      return Response.json(
        { error: 'Quantity must be at least 1' },
        { status: 400 }
      )
    }

    // For digital payments (bKash/Nagad), validate transaction details
    if (payment_type === 'bkash' || payment_type === 'nagad') {
      if (!transaction_number || !transaction_phone_number) {
        return Response.json(
          { error: `Transaction ID and phone number are required for ${payment_type} payment` },
          { status: 400 }
        )
      }
    }

    // Prepare data for insertion
    const orderData = {
      user_name,
      phone_number,
      payment_type,
      address,
      institution,
      quantity: orderQuantity
    }

    // Only include transaction details for digital payments
    if (payment_type === 'bkash' || payment_type === 'nagad') {
      orderData.transaction_number = transaction_number
      orderData.transaction_phone_number = transaction_phone_number
    } else {
      // For COD, set to null or default values
      orderData.transaction_number = 'COD'
      orderData.transaction_phone_number = null
    }

    // Insert order into Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return Response.json(
        { error: 'Failed to create order', details: error.message },
        { status: 500 }
      )
    }

    return Response.json(
      { success: true, data: data[0], payment_type },
      { status: 201 }
    )

  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
