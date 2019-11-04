import React from 'react';

class ViewBuilding extends React.Component {
    render() {
        const {buildings, selectedBuilding} = this.props;


        const buildingInfo = buildings.filter(building => {
            return building.id === selectedBuilding;
        })
            .map(building => {
                if (building.address && (building.address !== '')) {
                    return (
                        <div key={building.id}>
                            <span><b>Code:</b> {building.code}</span><br/>
                            <span><b>Name:</b> {building.name}</span><br/>
                            <span><b>Address:</b> {building.address}</span><br/>
                            <span><b>Coordinates:</b>{building.coordinates.latitude},{building.coordinates.longitude}</span>
                        </div>
                    );
                }

                if (building.coordinates && building.coordinates.latitude !== '' && building.coordinates.longitude !== '') {
                    return (
                        <div key={building.id}>
                            <span><b>Code:</b> {building.code}</span><br/>
                            <span><b>Name:</b> {building.name}</span><br/>
                            <span><b>Address:</b> {building.address}</span><br/>
                            <span><b>Coordinates:</b> {building.coordinates.latitude},{building.coordinates.longitude}</span>
                        </div>
                    );
                }

                return (
                    <div key={building.id}>
                        <span><b>Code:</b> {building.code}</span><br/>
                        <span><b>Name:</b> {building.name}</span><br/>
                    </div>
                );
            });
        return (
            <div className="selectedBuilding">
                <p>
                    {' '}
                    <i>Click on a name to view more information</i>
                </p>
                {buildingInfo}
            </div>
        );
    }
}

export default ViewBuilding;
