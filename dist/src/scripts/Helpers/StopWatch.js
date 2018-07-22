class StopWatch {
    constructor() {
    }
    Start() {
        this.startDate = new Date();
    }
    end() {
        this.endDate = new Date();
        this.result = this.endDate.getTime() - this.startDate.getTime();
    }
    getResult() {
        return this.result;
    }
}
export default StopWatch;
//# sourceMappingURL=StopWatch.js.map