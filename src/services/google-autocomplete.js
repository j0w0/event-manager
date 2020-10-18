export function parseAutocomplete(place) {
    
    // specify address types/formats needed
    const componentForm = {
        street_number: "short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        postal_code: "short_name",
    };

    const addressInputs = [];

    // get values from google return
    for(const component of place.address_components) {
        const addressType = component.types[0];

        if(componentForm[addressType]) {
            const val = component[componentForm[addressType]];
            addressInputs[addressType] = val;
        }
    }

    const updatedState = [];

    // put values into properties matching state
    if(place.geometry.location) {
        updatedState['lat'] = place.geometry.location.lat();
        updatedState['lng'] = place.geometry.location.lng();
    }

    if(addressInputs['street_number'] && addressInputs['route']) {
        updatedState['address'] = `${addressInputs['street_number']} ${addressInputs['route']}`;
    }

    if(addressInputs['locality']) {
        updatedState['city'] = addressInputs['locality'];
    }

    if(addressInputs['administrative_area_level_1']) {
        updatedState['state'] = addressInputs['administrative_area_level_1'];
    }

    if(addressInputs['postal_code']) {
        updatedState['zip'] = addressInputs['postal_code'];
    }

    return updatedState;
}

export function keyDown(keyEvent) {
    // prevent form submission when selecting address with 'enter' key
    if (keyEvent.keyCode === 13 || keyEvent.key === 'Enter') {
        keyEvent.preventDefault();
    }
}