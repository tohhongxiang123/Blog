import { format } from 'date-fns';

function formatDate(dateString: string | number | Date) {
    return format(new Date(dateString), 'dd MMM yyyy');
}

export { formatDate };
