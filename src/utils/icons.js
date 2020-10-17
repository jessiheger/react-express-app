import { faAddressBook, faClipboardCheck, faCreditCard, faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";

export const breadcrumbIcons = [
    {
        iconName: faShoppingCart,
        stepName: 'QUANTITY',
        hasNextStep: true,
    },
    {
        iconName: faAddressBook,
        stepName: 'CONTACT',
        hasNextStep: true,
    },
    {
        iconName: faCreditCard,
        stepName: 'BILLING',
        hasNextStep: true,
    },
    {
        iconName: faClipboardCheck,
        stepName: 'REVIEW_ORDER',
        hasNextStep: true,
    },
    {
        iconName: faStar,
        stepName: 'CONFIRMATION',
        hasNextStep: false,
    },
]