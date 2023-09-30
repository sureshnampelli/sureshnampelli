import { LightningElement } from 'lwc';

export default class AsyncExample extends LightningElement {

    message = '';
 
    connectedCallback() {
        this.message = 'Fetching data...';
        this.fetchData1(); // Simulating an API call
    }
 
    fetchData1() {
        setTimeout(() => {
            this.message = 'fetched successfully!';
        }, 2000); // Simulating a delay of 2 seconds
    }

    data = '';
 
    connectedCallback() {
        this.fetchData2()
            .then((result) => {
                this.data = result;
            })
            .catch((error) => {
                console.error('Error fetching data:', error.message);
            });
    }
 
    fetchData2() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const randomNumber = Math.random();
                if (randomNumber < 0.5) {
                    resolve('Data fetched successfully!');
                } else {
                    reject(new Error('Failed to fetch data'));
                }
            }, 10000);
        });
    }

   
    handleMouseOver() {
        // Modifying content of a DOM element
        const headerElement = this.template.querySelector('.header');
        headerElement.innerHTML = 'Mouse Over Header';
 
        // Changing style of a DOM element
        const paragraphElement = this.template.querySelector('.paragraph');
        paragraphElement.style.fontWeight = 'bold';
    }
}
