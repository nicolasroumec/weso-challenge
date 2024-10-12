export class Rate {
  constructor(date, base, rates) {
    this.date = date;
    this.base = base;
    this.rates = rates;
  }

  static fromDocument(doc) {
    return new Rate(doc.date, doc.base, doc.rates);
  }

  toDocument() {
    return {
      date: this.date,
      base: this.base,
      rates: this.rates
    };
  }
}

export const rateCollection = 'rates';