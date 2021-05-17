import { format } from 'date-fns'

function formatDate(dateString) {
    return format(new Date(dateString), "dd MMM yyyy")
}

export { formatDate }