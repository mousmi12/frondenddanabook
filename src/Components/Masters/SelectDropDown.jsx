import React, { useEffect, useState, useMemo, forwardRef } from 'react';
import Select from 'react-select';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import { masterFormDesign } from '../../PageStyle/pageStyleVariable';
import { useDispatch, useSelector } from 'react-redux';
import { useInputBoxValidation } from '../../Hook/useInputBoxValidation';
import { BaseURL, groupListData, handleEnterKeyPressMAaster } from './masterPagefunctions';
import './master.css';
import { selectFliterFunction } from '../../Redux/Reducer/filterSlice';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';

// Custom Menu component for adding new options
const CustomMenu = ({ innerRef, innerProps, isDisabled, children }) =>
  !isDisabled ? (
    <div ref={innerRef} {...innerProps} className="customReactSelectMenu rounded mt-1 w-[324px] border-1 border-[#43418e] text-black absolute z-50 bg-white">
      <div>{children}</div>
      {/* <div className='flex justify-between items-center px-3 text-black'>
        <span>Add</span>
        <button
          onClick={() => {
            // Add your logic here for the "Add New" button click
            console.log("Add New button clicked");
          }}
        >
          <AddIcon className='hover:text-[red]' />
        </button>
      </div> */}
    </div>
  ) : null;

function SelectDropDown({ field, formData, formDetails, handleInputChange, getAccDataUpdate, setgetAccDataUpdate, setIsValidateRequired, isValidateRequired, setAccountList, ref }) {
  const [groupList, setGroupList] = useState([]);
  const selectState = useSelector((state) => state.selectMenu);
  const selectFilterName = useSelector((state) => state.Filternames)
  const dispatch = useDispatch();
  const forward = forwardRef(ref)

  console.log("forward",forward);
  // create selectore foe Arabic Alignment
  const arabicAlignMent = useSelector((state) => state.arabicAlignMent)
  // darkTheme
  const darkModeState = useSelector((state) => state.darkMode)

  // Determine the API endpoint for the current field
  const apiEndpoint = field.apiendpoint;
  const apiServiceName = field.apiservicename;
  const apiArguments = field.apiarguments;

  const apiURL = useMemo(() => {
    if (!apiEndpoint) return null;
    return apiArguments
      ? `https://${apiServiceName}.${BaseURL}${apiEndpoint}?${apiArguments}`
      : `https://${apiServiceName}.${BaseURL}${apiEndpoint}`;
  }, [apiEndpoint, apiServiceName, apiArguments]);

  useEffect(() => {
    if (apiURL) {
      groupListData(apiURL, setGroupList, setAccountList);
    }
  }, [apiURL]);

  const options = useMemo(() => groupList.flatMap(item => {
    if (item.active && item.active.length > 0) {
      return item.active.map(acItem => ({
        value: acItem.id,
        label: acItem.name,
        isDisabled: (selectState.name === "Delete" || selectState.name === "View") ? true : field.readonly,
      }));
    }
    return [{
      value: item.id,
      label: item.name,
      isDisabled: (selectState.name === "Delete" || selectState.name === "View") ? true : field.readonly,
    }];
  }), [groupList, selectState, field]);

  const initialOption = useMemo(() => selectState.name !== "Insert" ?
    options.find(option => option.value === getAccDataUpdate?.data[0][field.name]) :
    options.find(option => option.label === selectFilterName.filtername), [options, selectState, getAccDataUpdate, field.name, selectFilterName.filtername]);

  console.log("initialOption", groupList)
  console.log("initialOptionss", initialOption)

  const customStyles = useMemo(() => ({
    control: (base, state) => ({
      ...base,
      height: 25,
      minHeight: 25,
      width: '100%',
      maxWidth: '100%',
      borderRadius: '6px',
      backgroundColor: `${(selectState.name === "Delete" || selectState.name === "View" || field.readonly) ? dayTheme.inputFildReadColor : darkModeState.checkvalue ? dayTheme.inputFildColor : darkTheme.inputFildColor}`,
      border: state.isFocused ? 0 : '1px solid #43418e',
      boxShadow: state.isFocused ? '0 0 0 2px #bfdbfe' : 0,
      outline: '#fb7185',
      '&:hover': { outline: '#fb7185' },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '20px',
      width: '100%',
      maxWidth: '100%',
      padding: '0 6px',
      margin: '0px 0px',
      fontSize: 14,
      color: 'black',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '20px',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px 0px 0px 0px',
      padding: '0px 0px 0px 0px',
      height: '20px',
      color: 'black',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? darkModeState.checkvalue ? dayTheme.LabelBarColor : darkTheme.LabelBarColor : "white",
      color: state.isSelected ? 'black' : 'black',
      padding: '3px 12px',
      '&:hover': { backgroundColor: darkModeState.checkvalue ? dayTheme.LabelBarColor : darkTheme.LabelBarColor },
    }),
  }), [selectState, field, darkModeState.checkvalue]);

  const validate = useInputBoxValidation();

  return (
    <div className={'sm:w-full lg:w-10/12 xl:w-10/12 2xl:w-10/12'}>
      <div className='relative sm:w-[100%] lg:w-[325px] xl:w-[325px]'>
        {groupList && groupList.length > 0 && (
          <Select
            ref={forward}
            className={`${field.required ? 'outline-rose-400' : 'outline-blue-200'} rounded-md text-gray-400`}
            options={options}
            menuPlacement="bottom"
            value={selectState.name !== "Insert" ? initialOption : (
              field.jsonref === null
                ? formData[field.name] ? options.find(option => option.value === formData[field.name]) : initialOption
                : formData[field.jsonref]?.[field.name] ? options.find(option => option.value === formData[field.jsonref][field.name]) : initialOption
            )}
            onChange={selectState.name !== "Insert"
              ? (selectedOption) => {
                const updatedData = { ...getAccDataUpdate };
                updatedData.data[0][field.name] = selectedOption ? selectedOption.value : null;
                setgetAccDataUpdate(updatedData);
              }
              : (selectedOption) => handleInputChange({

                target: {
                  name: field.name,
                  value: selectedOption ? selectedOption.value : null,
                  onClick: dispatch(selectFliterFunction({ filtername: selectedOption.label })),
                }

              }, field)
            }
            isSearchable={!(selectState.name === "Delete" || selectState.name === "View")}
            styles={customStyles}
            placeholder="Select"
            required={field.required}
            id={field.id}
            name={field.name}
            onInput={(event) => validate(event, field, setIsValidateRequired)}
            onInvalid={(event) => validate(event, field, setIsValidateRequired)}
            onKeyDown={(event) => handleEnterKeyPressMAaster(event, field, formDetails)}
            components={{ Menu: CustomMenu }}
            isDisabled={(selectState.name === "Delete" || selectState.name === "View")}
          />
        )}
        {isValidateRequired &&
          <p className={`text-rose-600 bold text-right absolute top-1  ${arabicAlignMent.rightToLeft === 'rtl' ? 'right-[280px] sm:right-[380px]' : 'left-[280px] sm:left-[380px]'}`} style={{ fontSize: '10px' }}>
            {field.required === true ? <CheckCircleOutlineRoundedIcon
              className={`${field.required && (!formData[field.name] || formData[field.name] === '') ? 'text-red' : 'text-green-900'}`}
              style={{ fontSize: '15px' }}
            /> : null}

          </p>}

      </div>
    </div>
  );
}

export default SelectDropDown;
