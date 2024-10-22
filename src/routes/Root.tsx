import { useUser } from 'hooks';
import { Navigate } from 'react-router-dom';
const Root = () => {
    const [loggedInUser] = useUser();
    const getRootUrl = () => {
        if (!loggedInUser) {
            return 'login';
        }
        switch (loggedInUser.user.type) {
            case 'Customer':
                return '/admin/pages/admindashboard';
            case 'Admin':
                return '/customer/dashboard';
            default:
                return '/customer/dashboard';
        }
    };

    const url = getRootUrl();

    return <Navigate to={url} />;
};

export default Root;
