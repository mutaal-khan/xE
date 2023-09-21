/*
    proudly done by @mutaalkhan
    github.com/mutaal-khan/xE

    Releases version 1.0.0

    - 04:15 PM - Friday, 21 July, 2023 - Panjshir, Afghanistan

    (C) All rights reserved

    [KHAN] | THE BELIEVERS ARE SUCCESSFUL
*/

/*
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
    >  |    General                                                                                                              v1.0.0
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
*/

/*

    Add and Delete Password Functions - input disable

*/

function replaceButton(add, del) {
    add.classList.toggle('hidden')
    del.classList.toggle('hidden')
}

// Active & Disable Input Elements

function setActive(el) {
    var activeClasses = 'bg-gray-900'
    var disabledClasses = 'bg-gray-800 text-green-500'
    disabledClasses.split(' ').forEach(cl => {
        el.classList.remove(cl)
    })
    activeClasses.split(' ').forEach(cl => {
        el.classList.add(cl)
    })
    el.removeAttribute('disabled', true)
}

function setDisable(el) {
    var activeClasses = 'bg-gray-900'
    var disabledClasses = 'bg-gray-800 text-green-500'
    activeClasses.split(' ').forEach(cl => {
        el.classList.remove(cl)
    })
    disabledClasses.split(' ').forEach(cl => {
        el.classList.add(cl)
    })
    el.setAttribute('disabled', true)
}

function changeEye(eyeParent) {
    /*
        The Parent Element is a Button so it cotains two SVGs and the second one is hidden by default
    */
    var eyes = eyeParent.children
    for(let i = 0; i < eyes.length; i++) {eyes[i].classList.toggle('hidden')}
}
function showKey(el, eyeButton) {
    /* Eye Button is the element that call this function - it is the parent */
    if(el.type === "password") {
        el.type = "text"
        changeEye(eyeButton)
    } else {
        el.type = "password"
        changeEye(eyeButton)
    }
}
function hideKey(el, eyeButton) {
    if(el.type === "text") {
        el.type = "password"
        changeEye(eyeButton)
    }
}
/*
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
    >  |    Encryption & Decryption                                                                                              v1.0.0
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
*/

var xData = {
    elements: {
        dataConsole: document.getElementById("data-textarea"),
        transformConsole: document.querySelector("[data-transform-console]"),
        encryptionKeyElement: document.getElementById("encryption-key"),
    },
    data: {
        encryptedData: "",
        decryptedData: '',
        encryptionKey: '',
        isKeyAdded: false,
        inputData: '',
        outputData: '',
        dataIs: '',
    },
    getData() {this.data.inputData = this.elements.dataConsole.value},
    updateData() {
        this.data.inputData = this.elements.dataConsole.value
        this.data.encryptionKey = this.elements.encryptionKeyElement.value // Should be delete it when validatePassword() is written
        this.outputData = this.elements.transformConsole.value
    },
    getKey() {
        this.data.encryptionKey = this.elements.encryptionKeyElement.value
        this.data.isKeyAdded = true
    },
    removeKey() {
        this.data.encryptionKey = ''
        this.elements.encryptionKeyElement.value = ''
        this.data.isKeyAdded = false
    },

    encrypt() {
        this.getData()
        this.data.encryptedData = CryptoJS.AES.encrypt(this.data.inputData, this.data.encryptionKey)
        this.data.dataIs = 'Encrypted'
        this.output(this.data.encryptedData)
        // Toast
        Toasts.showToast(Toasts.encryption.success)
        Toasts.reqToastHide(Toasts.requirements.dataReq)
    },
    decrypt() {
        this.getData()
        let decrypted = CryptoJS.AES.decrypt(this.data.inputData, this.data.encryptionKey)
        this.data.decryptedData = decrypted.toString(CryptoJS.enc.Utf8)
        this.data.dataIs = 'Decrypted'
        this.output(this.data.decryptedData)
        // Toast
        Toasts.showToast(Toasts.decryption.success)
        Toasts.reqToastHide(Toasts.requirements.dataReq)
    },
    output(out_data) {
        this.data.outputData = out_data
        this.elements.transformConsole.value = out_data
        // activeTab() & tabs From easyTab.js
        activeTab(tabs[1])
    },
    // update() {},
}

/*
    Encryption Key
*/

// Show Encryption Key
var encryptionKeyEye = document.querySelector('[data-show-encryption-key]')
encryptionKeyEye.addEventListener('click', ()=> {showKey(xData.elements.encryptionKeyElement, encryptionKeyEye)})

const addEncryptionKeyButton = document.querySelector('#add-encryption-key')
addEncryptionKeyButton.addEventListener('click', ()=> {    
    /*  Password * Ex: (Matrix*321) 
        - Default Options { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, 
        pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    */
    var valid = validator.isStrongPassword(xData.elements.encryptionKeyElement.value)
    if(valid) {
        xData.getKey()
        replaceButton(addEncryptionKeyButton, deleteEncryptionKeyButton)
        setDisable(xData.elements.encryptionKeyElement)
        hideKey(xData.elements.encryptionKeyElement, encryptionKeyEye)
        // Toasts.password.success
        Toasts.showToast(Toasts.password.success)
        Toasts.reqToastHide(Toasts.requirements.dataReq)
    } else {
        Toasts.reqToastShow(Toasts.requirements.dataReq)
    }
})

const deleteEncryptionKeyButton =  document.querySelector('#delete-encryption-key')
const deleteEncryptionKeyButtonConfirm = document.querySelector('#delete-encryption-key-yes') 
// Delete by confirmation
deleteEncryptionKeyButtonConfirm.addEventListener('click', ()=> {
    xData.removeKey()
    replaceButton(addEncryptionKeyButton, deleteEncryptionKeyButton)
    setActive(xData.elements.encryptionKeyElement)
})


// Run Encryption & Decryption

var encryptionButton = document.querySelector("#encrypt-button")
var decryptionButton = document.querySelector("#decrypt-button")

encryptionButton.addEventListener('click', ()=> {
    var valid = validator.isEmpty(xData.elements.dataConsole.value)
    if(!valid && xData.data.isKeyAdded) {
        xData.encrypt()
    } else {
        Toasts.reqToastShow(Toasts.requirements.dataReq)
    }
})
decryptionButton.addEventListener('click', ()=> {
    var valid = validator.isEmpty(xData.elements.dataConsole.value)
    if(!valid && xData.data.isKeyAdded) {
        xData.decrypt()
    } else {
        Toasts.reqToastShow(Toasts.requirements.dataReq)
    }
})

/*
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
    >  |    Console Tools                                                                                                        v1.0.0
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
*/

var Tools = {
    buttons: {
        clear: document.querySelector('#clear-console'),
        copyData: document.querySelector('#copy-data-console'),
        copyTransform: document.querySelector('#copy-transform-console'),
        past: document.querySelector('#past-to-console'),
        transfer: document.querySelector('#transfer-data'),
        removeBreaks: document.querySelector('#remove-breaks'),
    },
    clearConsole() {
        let emptyValue = ''
        xData.elements.dataConsole.value = emptyValue
        xData.elements.transformConsole.value = emptyValue
        xData.updateData()
    },
    copyDataConsole() {
        navigator.clipboard.writeText(xData.elements.dataConsole.value)
        .then((success) => {/*console.log("text copied")*/}),
        (err) => {/*console.log("error copying text")*/}
    },
    copyTransformConsole() {
        navigator.clipboard.writeText(xData.elements.transformConsole.value)
            .then((success) => {/*console.log("text copied")*/}),
            (err) => {/*console.log("error copying text")*/}
    },
    pastToConsole() {
        function writeIn(text) {
            xData.elements.dataConsole.value = text
        }
        navigator.clipboard.readText().then(cliptext =>(writeIn(cliptext)),err => {console.log(err)})
    },
    transferData() {
        xData.elements.dataConsole.value = xData.elements.transformConsole.value
        xData.elements.transformConsole.value = null
        xData.updateData()
        // activeTab() & tabs From easyTab.js
        activeTab(tabs[0])
    },
    removeLinebreaks() {
        /*
            Why this even exist?
            - When the encrypted data is prented in PDF file everything looks pretty.
              But when copying back that data from PDF file to past it in Data console.
              It Contains line breaks in encrypted data so this cuases error for decryption.
            
            So this func() might help for now.
        */
        var withoutLineBreaks = xData.elements.dataConsole.value.replace(/[\r\n]/gm, '')
        xData.elements.dataConsole.value = withoutLineBreaks
    },
    download() {},
    newConsoles() {
    // Clear Consoles & Encryption key, PDF Key, Zip Key
    },
    
}
Tools.buttons.clear.addEventListener('click', Tools.clearConsole)
Tools.buttons.copyData.addEventListener('click', Tools.copyDataConsole)
Tools.buttons.copyTransform.addEventListener('click', Tools.copyTransformConsole)
Tools.buttons.past.addEventListener('click', Tools.pastToConsole)
Tools.buttons.transfer.addEventListener('click', Tools.transferData)
Tools.buttons.removeBreaks.addEventListener('click', Tools.removeLinebreaks)



/*
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
    >  |    Tab Space in texarea                                                                                                 v1.0.0
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
*/
var textareas = document.getElementsByTagName('textarea')
var count = textareas.length
for(var i = 0; i < count; i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault()
            var s = this.selectionStart
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd)
            this.selectionEnd = s + '\t'.length
        }
    }
}
/*
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
    >  |    Toasts                                                                                                              v1.0.0
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
*/

var Toasts = {
    encryption: {
        success: document.querySelector('#toast-encryption-success'),
        // fail: document.querySelector('#toast-encryption-fail'),
    },
    decryption: {
        success: document.querySelector('#toast-decryption-success'),
        // fail: document.querySelector('#toast-decryption-fail'),
    },
    password: {
        success: document.querySelector('#toast-pass-success'),
        // fail: document.querySelector('#toast-pass-fail'),
    },
    requirements: {
        dataReq: document.querySelector('[data-input-requirements]'),
        pdfPass: document.querySelector('[data-pdf-pass-req]'),
        zipPass: document.querySelector('[data-zip-pass-req]'),
        downloadPDF: document.querySelector('[data-download-pdf-req'),
        downloadZIP: document.querySelector('[data-download-zip-req'),
    },
    reqToastShow(toast) {
        toast.classList.remove('hidden')
        toast.classList.remove('opacity-0')
    },
    reqToastHide(toast) {
        toast.classList.add('hidden')
        toast.classList.add('opacity-0')
    },
    showToast(toast) {
        toast.classList.remove('hidden')
        setTimeout(()=>{this.hideToast(toast)}, 3000)
    },
    hideToast(toast) {
        toast.classList.add('hidden')
    },
}



/*
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
    >  |    PDF                                                                                                                 v1.0.0
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
*/

/*
    PDF Password
*/
var pdfPassInput = document.querySelector('#pdf-password')
var pdfPass = null

// PDF Password
var pdfPassEye = document.querySelector('[data-show-pdf-pass]')
pdfPassEye.addEventListener('click', ()=> {showKey(pdfPassInput, pdfPassEye)})

// Add PDF Password
const addPDFpassButton = document.querySelector('#add-pdf-pass')
addPDFpassButton.addEventListener('click', ()=> {    
    /*  Password * Ex: (Matrix*321) 
        - Default Options { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, 
        pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    */
    var valid = validator.isStrongPassword(pdfPassInput.value)
    if(valid) {
        pdfPass = pdfPassInput.value
        replaceButton(addPDFpassButton, deletePDFpassButton)
        setDisable(pdfPassInput)
        hideKey(pdfPassInput, pdfPassEye)
        // Toasts.password.success
        Toasts.showToast(Toasts.password.success)
        Toasts.reqToastHide(Toasts.requirements.pdfPass)
    } else {
        Toasts.reqToastShow(Toasts.requirements.pdfPass)
    }
})

const deletePDFpassButton =  document.querySelector('#delete-pdf-pass')
const deletePDFpassButtonConfirm = document.querySelector('#delete-pdf-pass-yes') 

// Delete PDF Password by confirmation
deletePDFpassButtonConfirm.addEventListener('click', ()=> {
    pdfPass = ''
    pdfPassInput.value = ''
    replaceButton(addPDFpassButton, deletePDFpassButton)
    setActive(pdfPassInput)
})



/*
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
    >  |    ZIP                                                                                                                  v1.0.0
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
*/

/*
    ZIP Password
*/
var zipPassInput = document.querySelector('#zip-password')
var zipPass = ''

// ZIP Password
var zipPassEye = document.querySelector('[data-show-zip-pass]')
zipPassEye.addEventListener('click', ()=> {showKey(zipPassInput, zipPassEye)})

// Add ZIP Password
const addZIPpassButton = document.querySelector('#add-zip-pass')
addZIPpassButton.addEventListener('click', ()=> {    
    /*  Password * Ex: (Matrix*321) 
        - Default Options { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, 
        pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    */
    var valid = validator.isStrongPassword(zipPassInput.value)
    if(valid) {
        zipPass = zipPassInput.value
        replaceButton(addZIPpassButton, deleteZIPpassButton)
        setDisable(zipPassInput)
        hideKey(zipPassInput, zipPassEye)
        // Toasts.password.success
        Toasts.showToast(Toasts.password.success)
        Toasts.reqToastHide(Toasts.requirements.zipPass)
    } else {
        Toasts.reqToastShow(Toasts.requirements.zipPass)
    }
})

const deleteZIPpassButton =  document.querySelector('#delete-zip-pass')
const deleteZIPpassButtonConfirm = document.querySelector('#delete-zip-pass-yes') 

// Delete ZIP Password by confirmation
deleteZIPpassButtonConfirm.addEventListener('click', ()=> {
    zipPass = ''
    zipPassInput.value = ''
    replaceButton(addZIPpassButton, deleteZIPpassButton)
    setActive(zipPassInput)
})



/*
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
    >  |    Generate PDF & ZIP                                                                                                   v1.0.0
    >> -------------------------------------------------------------------------------------------------------------------------------- <<
*/


function xFiles({byZIP = false}) {
    function dataIs() {
        let is = ""
        if(xData.data.dataIs === 'Encrypted') {is = 'Encrypted'}
        else if(xData.data.dataIs === 'Decrypted') {is = 'Decrypted'}
        else is = 'xE'

        return is
    }
    function textColor() {
        let color = ""
        if(xData.data.dataIs === 'Encrypted') {color = '#34D399'}
        else if(xData.data.dataIs === 'Decrypted') {color = '#A78BFA'}
        else color = 'black'
        return color
    }

    const doc = new PDFDocument({
        autoFirstPage: false, 
        ownerPassword: pdfPass, // Only User Password!
        userPassword: pdfPass, // Default value is 'null' so if no pass is added, no pass requirements
        permissions: {copying: true}, 
    })
    // pipe the document to a blob
    const stream = doc.pipe(blobStream())
    doc.on('pageAdded', () => {
        doc.page.size = 'A4'
        doc.margins = { top: 60, left: 80, right: 80, bottom: 60 }
    })
    // Title
    doc.addPage()
    doc.font('Courier')
    doc.fontSize(24).fillColor('#34D399').text('xE', {align: 'left'})
    doc.fontSize(10).fillColor('gray').moveDown().text('______________________________________________________________________________\n', {align: 'center'})
    doc.moveDown(1).text('Matrix Encryption v1.0.0', {align: 'right'})
    doc.fontSize(10).fillColor('gray').text('______________________________________________________________________________\n', {align: 'center'})

    // Data
    doc.moveDown(3).fontSize(14).fillColor('#000').text(`${dataIs()} Data:`, {})
    doc.moveDown().fillColor('gray').fontSize(8).text('Please select the Data that is available inside two lines:')
    doc.fontSize(10).fillColor('gray').moveDown().text('______________________________________________________________________________\n', {align: 'center'})

    doc.moveDown(3.5).fontSize(16).fillColor(`${textColor()}`).text(`${xData.data.outputData}`)

    doc.moveDown(2).fontSize(10).fillColor('gray').text('______________________________________________________________________________\n', {align: 'center'})

    // User info
    doc.moveDown(3).fillColor('gray').fontSize(10).text(`${dataIs()}:`)
    doc.moveDown().fillColor('gray').fontSize(10).text('By: @anonymouse') // Myabe used username futures one day
    doc.moveDown().fillColor('gray').fontSize(10)
    .text(`Date: ${
        // moment.js
        moment().format('MMMM Do YYYY, h:mm:ss a')
    }`)

    // Infromation Page
    doc.addPage()
    doc.moveDown(4)
    doc.fontSize(150).fillColor('#34D399').text('xE', {align: 'center'})

    doc.moveDown().fontSize(14).fillColor('#34D399').text('xE - Matrix Encryption', {align: 'center', })
    doc.moveDown().fontSize(12).fillColor('black').text(`2023 - ${moment().format('YYYY')} (C) ALL RIGHTS RESERVED`, {align: 'center',})
    doc.moveDown().fontSize(12).fillColor('black').text('Privacy - Terms', {underline: false, align: 'center', link: 'https://mutaal-khan.github.io/xE/pages/privacy-and-terms/',})
    doc.moveDown(2).fontSize(10).fillColor('gray').text('For more information please visit:', {align: 'center', })
    doc.moveDown().fontSize(10).fillColor('#60A5FA').text('https://www.mutaal-khan.github.io/xE/', {underline: false, align: 'center', link: 'https://www.mutaal-khan.github.io/xE/',})
    doc.moveDown(14).fontSize(10).fillColor('gray').text('[KHAN] | THE BELIEVERS ARE SUCCESSFUL', {align: 'center'})

    // get a blob when you're done
    doc.end()
            
    const a = document.createElement("a")
    document.body.appendChild(a)
    a.style = "display: none"

    var anchor = document.querySelector('#download-PDF-link')

    let blob

    function download() {
        if (!blob) return
        var url = window.URL.createObjectURL(blob)
        a.href = url
        anchor.href = url
        a.download = '[KHAN]'
        a.click()
        anchor.click()
        window.URL.revokeObjectURL(url)
        blob = stream.toBlob("application/pdf")
    }

    var anchor = document.querySelector('#download-pdf-hidden-anchor')

    stream.on("finish", function() {
        // get a blob you can do whatever you like with
        blob = stream.toBlob("application/pdf")
        var pdfURL = window.URL.createObjectURL(blob)
        anchor.href = pdfURL
        // If false download pdf only
        if(!byZIP) {
            anchor.click()
        }
        window.URL.revokeObjectURL(pdfURL)
        // If true download zip
        if(byZIP) {
            // Generate ZIP
            const zipName = 'xE.zip'
            var zip = new JSZip()
            
            zip.file('xEncryption.pdf',blob) // putting pdf in the zip
            
            zip.generateAsync({type:"blob"}) .then(function(content) {    
                // see FileSaver.js    
                saveAs(content, zipName); 
            });
        }

        // or get a blob URL for display in the browser
        // const url = stream.toBlobURL("application/pdf")
        // const iframe = document.querySelector("iframe")
        // iframe.src = url
    })
}


const pdfDownloadButton = document.querySelector('#pdf-download')
pdfDownloadButton.addEventListener('click', ()=> {
    var valid = validator.isEmpty(xData.elements.transformConsole.value)
    if(!valid && xData.data.isKeyAdded) {
        xFiles({byZIP: false})
        Toasts.reqToastHide(Toasts.requirements.downloadPDF)
    } else {
        Toasts.reqToastShow(Toasts.requirements.downloadPDF)
    }
})

const zipDownloadButton = document.querySelector("#download-ZIP");
zipDownloadButton.addEventListener('click', ()=> {
    var valid = validator.isEmpty(xData.elements.transformConsole.value)
    if(!valid && xData.data.isKeyAdded) {
        xFiles({byZIP: true})
        Toasts.reqToastHide(Toasts.requirements.downloadZIP)
    } else {
        Toasts.reqToastShow(Toasts.requirements.downloadZIP)
    }
});
