export class Picture {
	constructor (
		public alt: string,
		public header: string,
		public text: string,
		public url: string,
    public id?: number,
	) {}
}