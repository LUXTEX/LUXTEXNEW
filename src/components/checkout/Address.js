import PropTypes from 'prop-types';
import CountrySelection from "./CountrySelection";

import StateSelection from "./StatesSelection";
import InputField from "./form-elements/InputField";
import Error from './Error';
import {isEmpty, map} from "lodash";
import Abbr from "./form-elements/Abbr";
import ArrowDown from "../icons/ArrowDown";
const Address = ({input,  states, handleOnChange, isFetchingStates, isShipping}) => {
    const {address2, errors} = input || {};

    const inputId = `address2-${isShipping ? 'shipping' : 'billing'}`;
    let countrieses = [{countryCode:"Кур'єрська доставка",countryName:"Кур'єрська доставка"},
    {countryCode:"Вітділення Нової Пошти",countryName:"Вітділення Нової Пошти"},
    
]; 


const deliveriAdres = address2 === "Кур'єрська доставка" ? "Адреса вулиці" : "Номер вітділення";
const deliveriplesholder = address2 === "Кур'єрська доставка" ? "Номер будинку та назва вулиці" : "Номер вітділення Нової пошти в Вашому місті";
    return (
        <>
            <div className="flex flex-wrap overflow-hidden sm:-mx-3">
                <InputField
                    name="firstName"
                    inputValue={input?.firstName}
                    required
                    handleOnChange={handleOnChange}
                    label="Ім'я"
                    errors={errors}
                    isShipping={isShipping}
                    containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
                />
                <InputField
                    name="lastName"
                    inputValue={input?.lastName}
                    required
                    handleOnChange={handleOnChange}
                    label="Прізвище"
                    errors={errors}
                    isShipping={isShipping}
                    containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
                />
            </div>
         {/*  <InputField
                name="company"
                inputValue={input?.company}
                handleOnChange={handleOnChange}
                label="Company Name (Optional)"
                errors={errors}
                isShipping={isShipping}
                containerClassNames="mb-4"
         />*/}
            {/* Country Selection*/}
            <InputField
                name="city"
                required
                inputValue={input?.city}
                handleOnChange={handleOnChange}
                label="Місто"
                errors={errors}
                isShipping={isShipping}
                containerClassNames="mb-4"
            />
        
           {/*} <InputField
                name="address2"
                inputValue={input?.address2}
                handleOnChange={handleOnChange}
                label="Street address line two"
                placeholder="Apartment floor unit building floor etc(optional)"
                errors={errors}
                isShipping={isShipping}
                containerClassNames="mb-4"
    />*/}
           
           
             <div className="mb-3">
            <label className="leading-7 text-sm text-gray-700" htmlFor={inputId}>
                Спосіб доставки
                <Abbr required/>
            </label>
            <div className="relative w-full border-none">
                <select
                    onChange={handleOnChange}
                    value={address2}
                    name="address2"
                    className="bg-gray-100 bg-opacity-50 border border-gray-500 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full"
                    id={inputId}
                >
                    <option value="">Вибрати спосіб...</option>
                    {!isEmpty(countrieses) &&
                    map(countrieses, (address2) => (
                        <option key={address2?.countryCode} data-countrycode={address2?.countryCode}
                                value={address2?.countryCode}>
                            {address2?.countryName}
                        </option>
                      
                    ))}
                </select>
                <span className="absolute right-0 mr-1 text-gray-500" style={{top: '25%'}}>
                    <ArrowDown width={24} height={24} className="fill-current"/>
                </span>
            </div>
            <Error errors={errors} fieldName={'address2'}/>
        </div>
        <InputField
                name="address1"
                inputValue={input?.address1}
                required
                handleOnChange={handleOnChange}
                label={deliveriAdres}
                placeholder={deliveriplesholder}
                errors={errors}
                isShipping={isShipping}
                containerClassNames="mb-4"
            />
            {/* State */}
            <StateSelection
                input={input}
                handleOnChange={handleOnChange}
                states={states}
                isShipping={isShipping}
                isFetchingStates={isFetchingStates}
            />
          
              {/*  <InputField
                    name="postcode"
                    inputValue={input?.postcode}
                    required
                    handleOnChange={handleOnChange}
                    label="Post code"
                    errors={errors}
                    isShipping={isShipping}
                    containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
              />*/}
                <InputField
                    name="phone"
                    inputValue={input?.phone}
                    required
                    handleOnChange={handleOnChange}
                    label="Телефон"
                    errors={errors}
                    isShipping={isShipping}
                    containerClassNames="mb-4"
                />
        
         {/*   <InputField
                name="email"
                type="email"
                inputValue={input?.email}
                required
                handleOnChange={handleOnChange}
                label="Email"
                errors={errors}
                isShipping={isShipping}
                containerClassNames="mb-4"
            />*/}
            {/*	@TODO Create an Account
            <div className="form-check">
            <label className="leading-7 text-sm text-gray-600" className="form-check-label">
            	<input onChange={ handleOnChange } className="form-check-input" name="createAccount" type="checkbox"/>
            		Create an account?
            </div>
            {/*<h2 className="mt-4 mb-4">Additional Information</h2>*/}
            {/* @TODO Order Notes */}
            {/*<div className="form-group mb-3">*/}
            {/*	<label className="leading-7 text-sm text-gray-600" htmlFor="order-notes">Order Notes</label>*/}
            {/*	<textarea onChange={ handleOnChange } defaultValue={ input.orderNotes } name="orderNotes" className="form-control woo-next-checkout-textarea" id="order-notes" rows="4"/>*/}
            {/*	<Error errors={ input.errors } fieldName={ 'orderNotes' }/>*/}
            {/*</div>*/}
        </>
    );
};

Address.propTypes = {
    input: PropTypes.object,
    countries: PropTypes.array,
    handleOnChange: PropTypes.func,
    isFetchingStates: PropTypes.bool,
    isShipping: PropTypes.bool
}

Address.defaultProps = {
    input: {},
    countries: [],
    handleOnChange: () => null,
    isFetchingStates: false,
    isShipping: false
}

export default Address;
