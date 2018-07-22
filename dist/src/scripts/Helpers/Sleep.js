class Sleep {
    static sleep(milliseconds) {
        let time = new Date().getTime() + milliseconds;
        while (new Date().getTime() <= time) { }
    }
}
export default Sleep;
//# sourceMappingURL=Sleep.js.map