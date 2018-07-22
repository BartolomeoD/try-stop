class Sleep {
    static sleep(milliseconds : number) {
        let time = new Date().getTime() + milliseconds;
        while (new Date().getTime() <= time) {}
    }
}

export default Sleep;