export const ContactFields = [
    {
        label: 'First Name',
        name: 'firstName',
        placeholder: 'Minnie',
        required : true,
        validation: /^[a-z ,.'-]+$/i,
        message: 'Please provide first name.'
    },
    {
        label : 'Last Name',
        name: 'lastName',
        placeholder: 'Mouse',
        required: true,
        validation: /^[a-z ,.'-]+$/i,
        message: 'Please provide last name.'
    },
    {
        label: 'Email Address',
        name: 'email',
        placeholder: 'minniemouse@disney.com',
        required: true,
        validation: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address.'
    },
    {
        label: 'Address',
        name: 'street1',
        placeholder: '1234 Strawberry Lane',
        required: true,
        validation: /^[A-Za-z0-9-( )]+$/i,
        message: 'Please use only numbers, letters, spaces, and dashes (-).',
    },
    {
        label: 'Apartment/Unit',
        name: 'street2',
        placeholder: 'Apt A',
        required: false,
        validation: /^[A-Za-z0-9 ,.'-]+$/i,
        message: 'Please use only numbers, letters, spaces, and dashes (-).',
    },
    {
        label: 'City',
        name: 'city',
        placeholder: 'Los Angeles',
        required: true,
        validation: /^[a-z -]+$/i, 
        message: 'Please use only letters, spaces, and dashes (-).',
    },
    {
        label: 'State',
        name: 'state',
        placeholder: 'CA',
        required: true,
        validation: /[A-Z][A-Z]/,
        message: 'Please enter two-letter abbreviation (WA, NY, etc.).',
    },
    {
        label: 'Zipcode',
        name: 'zip',
        placeholder: '12345',
        required: true,
        validation: /(^\d{5}$)/,
        message: 'Please enter 5-digit zipcode.',
    },
    {
        label: 'Phone Number',
        name: 'phone',
        placeholder: '111-222-3333',
        required: true,
        validation: /(^\d{3}-\d{3}-\d{4}$)/,
        message: 'Please enter as ###-###-####.',
    }
];

export const BillingFields = [
    {
        label: 'Credit Card Number',
        name: 'ccNum',
        placeholder: 'XXXXXXXX',
        required: true,
        validation: /^[0-9]+/,
        message: 'Please use only numbers.'
    },
    {
        label: 'Expiration (MM/YY)',
        name: 'expiration',
        placeholder: '03/25',
        required: true,
        validation: /^((0[1-9])|(1[0-2]))\/(\d{2})$/,
        message: 'Please enter as MM/YY.'

    }
]