
export class RegisterPage{

    constructor (page){
        this.page = page
        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('password')
        this.registerButton = page.getByRole('button', {name: 'register'})
    }

    // signUpAsNewUser = async () =>{
    //     //type info email input
    //     // type info password input
    //     //click button
    //   // this is usiing only for 1 time  
    //     // await this.emailInput.waitFor()
    //     // await this.emailInput.fill("test@test.com")
    //     // await this.passwordInput.waitFor()
    //     // await this.passwordInput.fill("slaptazodis")
    //     // await this.registerButton.waitFor()
    //     // await this.registerButton.click()
    //     // await this.page.pause()

    // //randomise email and password when automaticly changed wit uuid  email and pass
    //     await this.emailInput.waitFor()
    //     const emailId = uuidv4()
    //     const email = emailId + "@gmail.com" //test@gmail.com
    //     await this.emailInput.fill(email)
    //     await this.passwordInput.waitFor()
    //     const password = uuidv4()
    //     await this.passwordInput.fill(password)
    //     await this.registerButton.waitFor()
    //     await this.registerButton.click()
    //     await this.page.pause()

    // }

    signUpAsNewUser = async(email, password) =>{
        await this.emailInput.waitFor()
        await this.emailInput.fill(email)
        await this.passwordInput.waitFor()
        await this.passwordInput.fill(password)
        await this.registerButton.waitFor()
        await this.registerButton.click()
        // await this.page.pause()

    }

}