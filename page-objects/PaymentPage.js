

import { expect } from "@playwright/test"

export class PaymenPage{
    constructor(page){
        this.page=page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        //new element for the discount input
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountActivateMessage = page.locator('[data-qa="discount-active-message"]')
        this.discountValue = page.locator('[data-qa="total-with-discount-value"]')
        this.totalValue = page.locator('[data-qa="total-value"]')

        this.creditCardOwnerInput = page.getByPlaceholder('Credit card owner')
        this.creditCardNumbetInput = page.getByPlaceholder('Credit card number')
        this.validUntilInput = page.getByPlaceholder('Valid until')
        this.creditCardCvcInput = page.getByPlaceholder('Credit card CVC')
        this.payButton = page.locator('[data-qa="pay-button"]')

    }

    activateDiscount = async () =>{

        await this.discountCode.waitFor()
        const code =  await this.discountCode.innerText() // gaunamas tekstas kuris reikalingas
        await this.discountInput.waitFor()
        //option 1
        // need to fill this discount input
        await this.discountInput.fill(code)
        //wait to see that input contains tje value which was entered
        await expect (this.discountInput).toHaveValue(code)

        //option 2 slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code)

        // //option 3 
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay:1000}) // pridedamas laikas kad vienai raidei parasyti uztektu laiko tai naudojama kai laginamas inputas
        // expect (await this.discountInput.inputValue()).toBe(code)
        // await this.page.pause()
        
        expect (await this.discountValue.isVisible()).toBe(false)
        expect (await this.discountActivateMessage.isVisible()).toBe(false)
        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        await this.discountActivateMessage.waitFor()
        await this.discountValue.waitFor()
        const discountValueText = await this.discountValue.innerText() // "345$"
        const discountValueOnlyStringNumber = discountValueText.replace("$","")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber,10)
       // const discountValueOnlyNumber = parseInt(discountValueText.repace("$", ""),10) sutrumpintas
       
       await this.totalValue.waitFor()
       const totalValueText = await this.discountValue.innerText() // "345$"
       const totalValueOnlyStringNumber = totalValueText.replace("$","")
       const totalValueNumber = parseInt(totalValueOnlyStringNumber,10)
       //check that discaunt total price is smaller then regular price
       expect (discountValueNumber).toBe(totalValueNumber)
    //    await this.page.pause()

    }

    fullPaymentDetails = async(paymentDetails) => {
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetails.owner)
        await this.creditCardNumbetInput.waitFor()
        await this.creditCardNumbetInput.fill(paymentDetails.number)
        await this.validUntilInput.waitFor()
        await this.validUntilInput.fill(paymentDetails.validUntil)
        await this.creditCardCvcInput.waitFor()
        await this.creditCardCvcInput.fill(paymentDetails.cvc)


        await this.page.pause()
    }
    continueToPay = async() =>{
        await this.payButton.waitFor()
        await this.payButton.click()
        this.page.waitForURL(/\/thank-you/, {setTimeout:3000})

    }
}