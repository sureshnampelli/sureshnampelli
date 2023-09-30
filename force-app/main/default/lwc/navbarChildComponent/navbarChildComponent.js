import { LightningElement ,api} from 'lwc';

export default class NavbarChildComponent extends LightningElement {
    @api navList;
    handleNavSelection(event) {
        event.preventDefault();
        const selectEvent = new CustomEvent('selection', {
            detail: event.target.name
        });
        // Fire the custom event
        this.dispatchEvent(selectEvent);
    }

}