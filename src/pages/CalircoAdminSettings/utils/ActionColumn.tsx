import { useNavigate } from 'react-router-dom';

export const ActionColumn = ({ row }: any) => {
    const navigate = useNavigate();
    let path = '/admin/pages/edit';
    let identity = row?.cells[1]?.column?.Header;
    identity = identity.replace('Name','').toLowerCase()
    path = path + '/' + identity;
    return (
        <div className="action-icon">
            <div style={{}}>
                <i className="mdi mdi-pencil-box-multiple" onClick={()=>navigate(path, {state: row?.original})}></i>
            </div>
        </div>
    );
};