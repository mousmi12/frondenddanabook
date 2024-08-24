import { useTranslation } from 'react-i18next';

export const useInputBoxValidation = () => {
  const { t } = useTranslation();

  const validate = (event, field, setIsValidateRequired) => {
    console.log("Validation error", field.name);
    // setIsValidateRequired(true)
   
    // if (field.inputtype === 'Text') {
    //   if (field.required === 'true' && event.target.value !== null) {
    //     event.target.setCustomValidity(t('multipleLageError') + `${field.label}`);
    //   } else {
    //     event.target.setCustomValidity('');
    //   }

    // } else if (field.name === 'docdate') {
    //     event.target.setCustomValidity(t(`docdateError`));
    // } else if (field.name === 'accid') {
    //     event.target.setCustomValidity(t(`accidError`));
    // } else if (field.name === 'name' && !event.target.value) {
    //     event.target.setCustomValidity(t(`nameError`));
    // } else if (field.name === 'mobile' && event.target.value) {
    //     const getMobiletag = document.getElementById(`${field.id}`)
    //     getMobiletag.setAttribute('pattern','[0-9]{10}')
    //     if (!/^[0-9]{10}$/.test(event.target.value)) {
    //         event.target.setCustomValidity(t('invalidMobileError'));
    //       } else {
    //         event.target.setCustomValidity('');
    //       }
    if (field.inputtype === 'Email' && event.target.value) {
      const getEmailtag = document.getElementById(`${field.id}`)
      getEmailtag.setAttribute('pattern', '[^@]+@[^@]+\.[a-zA-Z]{2,6}')
      if (!/[^@]+@[^@]+\.[a-zA-Z]{2,6}/.test(event.target.value)) {
        event.target.setCustomValidity(t('multipleLageError') + `${field.label}`);
      } else {
        event.target.setCustomValidity('');
      }
    } else if (field.inputtype === 'URL' && event.target.value) {
      const getWebsitetag = document.getElementById(`${field.id}`)
      getWebsitetag.setAttribute('pattern', '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')
      if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(event.target.value)) {
        event.target.setCustomValidity(t('multipleLageError') + `${field.label}`);
      } else {
        event.target.setCustomValidity('');
      }
    } else if (field.inputtype === 'Number' && event.target.value && field.decimalplaces === null) {
      const getCreditDaytag = document.getElementById(`${field.id}`)
      getCreditDaytag.setAttribute('pattern', '[0-9]\d*$')
      if (!/^[0-9]\d*$/.test(event.target.value)) {
        event.target.setCustomValidity(t('multipleLageError') + `${field.label}`);
      } else {
        event.target.setCustomValidity('');
      }
    } else if (field.inputtype === 'Number' && event.target.value && field.decimalplaces !== null) {
      const inputElement = document.getElementById(`${field.id}`);
      const decimalPattern = `^\\d*(\\.\\d{0,${field.decimalplaces}})?$`;

      inputElement.setAttribute('pattern', decimalPattern);

      if (!new RegExp(decimalPattern).test(event.target.value)) {
        event.target.setCustomValidity(t('multipleLageError') + `${field.label}`);
      } else {
        event.target.setCustomValidity('');
      }
    } else if (field.inputtype && !event.target.validate && !event.target.value) {
      event.target.setCustomValidity(t('multipleLageError') + ` ${field.label}`);
      setIsValidateRequired(true)
    } else if (field.inputtype === 'Dropdown' && !event.target.validate && !event.target.value) {
      event.target.setCustomValidity(t('multipleLageError') + ` ${field.label}`);
      setIsValidateRequired(true)
    } else {
      event.target.setCustomValidity('');
    }
  };

  return validate;
};


