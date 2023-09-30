import { LightningElement } from 'lwc';

export default class CheckboxExample extends LightningElement {
    selection;

    handleCheckboxChange() {
        // Query the DOM
        const checked = Array.from(
            this.template.querySelectorAll('lightning-input')
        )
            // Filter down to checked items
            .filter((element) => element.checked)
            // Map checked items to their labels
            .map((element) => element.label);
        this.selection = checked.join(', ');
    }
}