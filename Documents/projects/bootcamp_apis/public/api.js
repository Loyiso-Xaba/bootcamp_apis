document.addEventListener("alpine:init", () => {

    Alpine.data('bootCamp', () => {
        return {
            sentence: '',
            longestWord: '',
            shortestWord: '',
            sum: 0,
            showResults: false,

            bill: '',
            totalBill: '',
            showBillTotal: false,

            callPrice: 0,
            smsPrice: 0,
            showCall: false,
            showSms: false,

            type: '',
            newPrice: '',
            setPriceStatus: '',
            setPriceMessage: '',
            showSetPriceMessage: false,

            newCallPrice: '',
            newSmsPrice: '',
            showNewCallPrice: false,
            showNewSmsPrice: false,

            projectedUsage: '',
            availableAirtime: '',
            airtimeLeft: '',
            showAirtimeResult: false,


            wordGame() {
                if (!this.sentence) {
                    alert('Enter a sentence to be analyzed!!!');
                    return;
                }
                axios.get(`http://localhost:4020/api/word_game?sentence=${this.sentence}`)
                    .then(response => {
                        const data = response.data;
                        this.longestWord = data.longestWord;
                        this.shortestWord = data.shortestWord;
                        this.sum = data.sum;
                        this.showResults = true;

                        this.sentence = '';
                        setTimeout(() => {
                            this.showResults = false;
                        }, 6000);
                    });
            },

            calculateTotal() {
                if (!this.bill) {
                    alert('Only enter call or sms');
                    return;
                }

                axios.post(`http://localhost:4020/api/phonebill/total`, { bill: this.bill })
                    .then(response => {
                        this.totalBill = response.data.total;
                        this.showBillTotal = true;

                        this.bill = '';
                        setTimeout(() => {
                            this.showBillTotal = false;
                        }, 6000);
                    });
            },

            showCallPrice() {
                axios.get(`http://localhost:4020/api/phonebill/prices`)
                    .then(response => {
                        this.callPrice = response.data.call;
                        this.showCall = true;
                        this.showSms = false;
                        setTimeout(() => {
                            this.showCall = false;
                        }, 6000);
                    });
            },

            showSmsPrice() {
                axios.get(`http://localhost:4020/api/phonebill/prices`)
                    .then(response => {
                        this.smsPrice = response.data.sms;
                        this.showSms = true;
                        this.showCall = false;
                        setTimeout(() => {
                            this.showSms = false;
                        }, 6000);
                    });
            },

            setNewPrice() {
                if (!this.type || !this.newPrice) {
                    alert('Fill in new inputs');
                    return;
                }

                if (this.type === 'call' || this.type === 'sms') {
                    axios.post(`http://localhost:4020/api/phonebill/price`, { type: this.type, price: this.newPrice })
                        .then(response => {
                            this.setPriceStatus = `Status: ${response.data.status}`;
                            this.setPriceMessage = `The ${this.type} price has been set to R${parseFloat(this.newPrice).toFixed(2)}!!!`;
                            this.showSetPriceMessage = true;

                            if (this.type === 'call') {
                                this.newCallPrice = parseFloat(this.newPrice).toFixed(2);
                            } else if (this.type === 'sms') {
                                this.newSmsPrice = parseFloat(this.newPrice).toFixed(2);
                            }

                            this.newPrice = '';
                            this.type = '';
                            setTimeout(() => {
                                this.showSetPriceMessage = false;
                            }, 6000);
                        });
                } else {
                    this.setPriceStatus = 'Status: error';
                    this.setPriceMessage = ` Only accepts strings 'call' and 'sms'.`;
                    this.showSetPriceMessage = true;
                    setTimeout(() => {
                        this.showSetPriceMessage = false;
                    }, 6000);
                }
            },

            showUpdatedCallPrice() {
                if (this.newCallPrice) {
                    this.showNewCallPrice = true;
                    this.showNewSmsPrice = false;
                    setTimeout(() => {
                        this.showNewCallPrice = false;
                    }, 6000);
                }
            },

            showUpdatedSmsPrice() {
                if (this.newSmsPrice) {
                    this.showNewSmsPrice = true;
                    this.showNewCallPrice = false;
                    setTimeout(() => {
                        this.showNewSmsPrice = false;
                    }, 6000);
                }
            },

            checkAirtime() {
                if (!this.projectedUsage || !this.availableAirtime) {
                    alert('Enter estimated usage and available airtime!!');
                    return;
                }

                axios.post(`http://localhost:4020/api/enough`, {
                    usage: this.projectedUsage,
                    available: parseFloat(this.availableAirtime)
                })
                    .then(response => {
                        this.airtimeLeft = response.data.result;
                        this.showAirtimeResult = true;

                        this.projectedUsage = '';
                        this.availableAirtime = '';

                        setTimeout(() => {
                            this.showAirtimeResult = false;
                        }, 6000);
                    })
                    .catch(error => {
                        console.error('Ran into error checking airtime:', error);
                    });
            },

        }
    })
});