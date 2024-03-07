
export class Navigation{

    constructor(page){
        this.page = page
        this.checkoutLink = page.getByRole('link', {name: 'Checkout'})
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
    }

    getbasketCount = async () => {
        await this.basketCounter.waitFor()
        // return number
        const text = await this.basketCounter.innerText()
        //"9" = 9
        const asNumber = parseInt(text, 10)
        return asNumber
    }
    goToCheckout = async () =>{
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
    }

}