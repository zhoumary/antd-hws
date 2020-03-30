import {fetchRoles, fetchRolesError} from '../actions';
import {getRoles} from '../../services/getRoles';

const axiosGetRoles = () => {
    return ((dispatch: (arg0: { type: string; payload: string | { name: string; id: number; description: string; }[]; }) => void) => {
        getRoles()
            .then((response) => {
                console.log(response);
                if (response) {
                    dispatch(fetchRoles(response));
                }
            })
            .catch((error) => {
                dispatch(fetchRolesError(error));
            })
    })
}

export default axiosGetRoles;