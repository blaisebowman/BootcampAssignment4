import React from 'react';
import Button from 'react-bootstrap/Button';

class BuilingList extends React.Component {
    selectedUpdate(id) {
        this.props.selectedUpdate(id);
        console.log(id);
    }

    render() {
        const {buildings, filterText} = this.props;
        const buildingList = buildings.filter(directory => {
            return (
                directory.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0 ||
                directory.code.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
            )
        })
            .map((directory) => {
                return (
                    <tr key={directory.id}>
                        <td>{directory.code} </td>
                        <Button onClick={() => this.selectedUpdate(directory.id)}>{directory.name}</Button>

                    </tr>
                );
            });
        return <tbody>{buildingList}</tbody>;
    }
}

export default BuilingList;
