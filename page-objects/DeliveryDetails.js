import {expect} from "@playwright/test"

export class DeliveryDetails{
    constructor(page){
        this.page=page
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postCodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.countrySellection = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = page.locator('[data-qa="save-address-button"]')
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.saveAddressFirstname = page.locator('[data-qa="saved-address-firstName"]')
        this.saveAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAdressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPstcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')

        this.continueToPaymantButton = page.getByRole('button', { name: 'Continue to payment' })
    }

    fillDetails = async (userAddress)=>{
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddress.street)
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill(userAddress.postCode)
        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddress.city)
        await this.countrySellection.waitFor()
        await this.countrySellection.selectOption(userAddress.country)
    }

    saveDetails = async () =>{
        const addressCountBeforeSavind = await this.saveAddressContainer.count() //parasius si reikia padaryti importa
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await this.saveAddressContainer.waitFor()
        await expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSavind + 1)

        await this.saveAddressFirstname.first().waitFor()
        expect(await this.saveAddressFirstname.first().innerText()).toBe(await this.firstNameInput.inputValue())

        await this.saveAddressLastName.first().waitFor()
        expect( await this.saveAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())

        await this.savedAdressStreet.first().waitFor()
        expect( await this.savedAdressStreet.first().innerText()).toBe(await this.streetInput.inputValue())

        await this.savedAddressPstcode.first().waitFor()
        expect(await this.savedAddressPstcode.first().innerText()).toBe(await this.postCodeInput.inputValue())

        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())

        await this.savedAddressCountry.first().waitFor()
        expect( await this.savedAddressCountry.first().innerText()).toBe( await this.countrySellection.inputValue())
        // await this.page.pause()


    }
    continueToPayment = async () =>{
        await this.continueToPaymantButton.waitFor()
        await this.continueToPaymantButton.click()
        this.page.waitForURL(/\/payment/, {setTimeout:3000})
        // await this.page.pause()
    }

    
}