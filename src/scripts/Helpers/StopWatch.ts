class StopWatch {
    private startDate: Date;
    private endDate: Date;
    private result: number;

    constructor() {
    }

    public Start() {
        this.startDate = new Date();
    }

    public end() {
        this.endDate = new Date();
        this.result = this.endDate.getTime() - this.startDate.getTime();
    }

    public getResult(): number {
        return this.result;
    }
}

export default StopWatch;