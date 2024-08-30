export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public description: string,
    public category: string,
    public image: string,
    public active: boolean,
    public rating: Rating,
  ) {}
}

export class Rating {
  constructor(
    public rate: number,
    public count: number
  ) {}
}