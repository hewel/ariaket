class App {
    private readonly option: string
    public constructor(option: string) {
        this.option = option
    }

    public logOption() {
        console.log(this.option)
    }
}

const app = new App('hello')
app.logOption()
const use = new App('log')
use.logOption()
