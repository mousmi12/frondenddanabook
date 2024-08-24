import { useEffect, useMemo, useRef, useState } from 'react';
import { MantineReactTable, useMantineReactTable, MRT_ToggleFiltersButton, MRT_ToggleGlobalFilterButton, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton, MRT_ShowHideColumnsButton, MRT_GlobalFilterTextInput } from 'mantine-react-table';
import ReloadComponent from '../CommanCoponent/ReloadComponent'
import './master.css'
import { getTableListItems } from './masterPagefunctions';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenuFunction } from '../../Redux/Reducer/activateMenuSlice';
import PluseIcon from '../../asset/plus icon.png'
import BeforeLoadTableData from '../CommanCoponent/BeforeLoadTableData';
import { selectFliterFunction } from '../../Redux/Reducer/filterSlice';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import LeftArrowImg from '../../asset/arrow filter/left.png'
import RightArrowImg from '../../asset/arrow filter/right.png'
import { svgImgPath } from '../../svgimagePath';
import EmptyData from '../../asset/Menusvg/main/emptydata.png'
import { Box, Tooltip } from '@mantine/core';
import { reduceMenuData } from '../../svgimagejsript';
import './icons.css';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';


function MasterList({ formDetails, hiddenReloadIcon, LoadheadingTime, setdisplayCustomAlertBox, setdisplaySuccErrAlert }) {
    // Optionally, you can manage the row selection state yourself
    const [TableItemList, setTableItemList] = useState({});
    const [menuLoaded, setMenuLoaded] = useState(true);
    const [loadingTime, setLoadingTime] = useState(0);
    const [activeInactive, setActiveInactive] = useState('active');
    const [rowSelection, setRowSelection] = useState({});
    const [svgImages, setSvgImages] = useState([])

    const rowSelectionCount = Object?.keys(rowSelection)?.length

    console.log("row count", rowSelectionCount)

    const getrowcolor = (color) => {
        console.log("getrowcolor", color)
        if (color) {
            return dayTheme.DtableColor
        }
        else {
            return darkTheme.DtableColor
        }

    }

    const getrowtextColor = (color) => {
        if (color) {
            return dayTheme.DlabelTextColor
        }
        else {
            return darkTheme.DlabelTextColor
        }
    }

    const selectState = useSelector((state) => state.selectMenu);
    const dispatch = useDispatch();

    const selectFilterName = useSelector((state) => state.Filternames)

    // create selectore foe Arabic Alignment
    const arabicAlignMent = useSelector((state) => state.arabicAlignMent)

    const darkModeState = useSelector((state) => state.darkMode)
    console.log("darkModeState", darkModeState)

    //getting svg image
    useEffect(() => {
        reduceMenuData().then(data => setSvgImages(data));
    }, [])

    console.log("Svg IMage", svgImages);


    console.log("selectState", selectFilterName.filtername)


    console.log("TableItemList", TableItemList)
    console.log("ForDetails", formDetails)

    // alert box
    setdisplayCustomAlertBox(false);
    setdisplaySuccErrAlert(false);


    useEffect(() => {
        const startTime = new Date(); // Get the start time when component mounts
        getTableListItems(formDetails, setTableItemList, setMenuLoaded).then(() => {
            const endTime = new Date(); // Get the end time when data loading is complete
            const timeDifference = endTime - startTime; // Calculate the time taken to load data
            const timeInSeconds = timeDifference / 1000; // Convert milliseconds to seconds
            setLoadingTime(timeInSeconds); // Update the loading time state
        });
    }, [formDetails]);

    useEffect(() => {
        let initalvaluefil
        let initalId
        // Check if TableItemList.data exists and has at least one item
        if (TableItemList && TableItemList.data && TableItemList.data.length > 0) {
            initalvaluefil = TableItemList.data[0].name ? TableItemList.data[0].name : TableItemList.data[0].opname
            initalId = TableItemList.data[0].id
            // Set filterName to the value of the first item's name property
            // setFilterName(prevState => ({
            //     ...prevState,
            //     filterInitialValue: TableItemList.data[0].name
            // }));
            let filterInitalvalue;

            const filtervalue = TableItemList.data.filter((item) => {
                if (item.name === initalvaluefil) {
                    const matchingFilter = TableItemList.data.find((filter) => filter.name === selectFilterName.filtername);
                    filterInitalvalue = matchingFilter ? selectFilterName.filtername : initalvaluefil;
                }

            });




            dispatch(selectFliterFunction({ filtername: filterInitalvalue, filterId: initalId }));

            console.log("indexnumber", filterInitalvalue)
            console.log("indexnumber", initalvaluefil)
            // console.log("indexnumber", filterInitalvalue, "filterInitalvalue")


        }
    }, [TableItemList]);

    // scroll button
    const handleButtonClick = (filterButton) => {
        dispatch(selectFliterFunction({ filtername: filterButton.name, filterId: filterButton.id }));

        // Scroll the selected button into view
        const buttonElement = document.getElementById(`filter-button-${filterButton.id}`);
        if (buttonElement) {
            buttonElement.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
        }
    };


    // const columns = useMemo(
    //     () => {
    //         if (formDetails && formDetails.list_fields) {
    //             return formDetails.list_fields.map(item => ({
    //                 accessorKey: item.name,
    //                 // enableColumnActions: false,
    //                 // enableSorting:false,
    //                 header: item.label,
    //                 size: item.listwidth,
    //                 sx: {
    //                     tableLayout: 'fixed',
    //                 },
    //             }));
    //         } else {
    //             return [];
    //         }
    //     },
    //     [formDetails] 
    // );

    // const columns = useMemo(
    //     () => {
    //         if (formDetails && formDetails.list_fields) {
    //             const columnDefinitions = formDetails.list_fields.map(item => ({
    //                 accessorKey: item.name,
    //                 // enableColumnActions: false,
    //                 // enableSorting:false,
    //                 header: item.label,
    //                 size: item.listwidth,
    //                 sx: {
    //                     tableLayout: 'fixed',
    //                 },
    //             }));

    //             // Adding a custom action column
    //             columnDefinitions.push({
    //                 accessorKey: 'actions',
    //                 header: 'Actions',
    //                 size: 100, // Adjust size as needed
    //             });

    //             return columnDefinitions;
    //         } else {
    //             return [];
    //         }
    //     },
    //     [formDetails]
    // );


    const columns = useMemo(
        () => {
            if (formDetails && formDetails.list_fields) {
                // Sort the list_fields by listposition
                const sortedFields = [...formDetails.list_fields].sort((a, b) => a.listposition - b.listposition);

                const columnDefinitions = sortedFields.map(item => ({
                    accessorKey: item.name,
                    header: item.label,

                    Header: ({ column }) => (
                        <h1 style={{ color: 'white' }}>{column.columnDef.header}</h1>
                    ),
                    size: item.listwidth,
                    sx: {
                        tableLayout: 'fixed',
                    },
                }));


                // Adding a custom action column
                columnDefinitions.push({
                    accessorKey: 'actions',
                    header: 'Actions',
                    Header: ({ column }) => (
                        <h1 style={{ color: 'white' }}>{column.columnDef.header}</h1>
                    ),
                    size: 100, // Adjust size as needed
                });

                return columnDefinitions;
            } else {
                return [];
            }
        },
        [formDetails, darkModeState]
    );


    // display data items
    const data = useMemo(() => {
        if (TableItemList && TableItemList.data && TableItemList.data.length > 0 && formDetails && formDetails.list_fields && formDetails.list_actions) {
            return TableItemList.data
                .filter(filter => filter.name ? filter.name === selectFilterName.filtername : filter.opname === selectFilterName.filtername)
                .map(tbitem => {
                    const acInValue = activeInactive
                    console.log("active value", acInValue)
                    const mappedItem = tbitem?.[acInValue]
                        && tbitem?.[acInValue].length > 0 && tbitem?.[acInValue].map(acmap => {
                            // Assuming userId is associated with each tbitem
                            return {
                                ...formDetails.list_fields.reduce((acc, item) => {
                                    return {
                                        ...acc,
                                        [item.name]: acmap[item.name],

                                    };
                                }, {}),
                                userId: tbitem.opid ? acmap.txn_id : acmap.id,
                                deleteId: acmap.id
                                // userId: acmap.id // Assuming userId is available as acmap.id
                            };
                        });


                    if (!tbitem?.[acInValue] || tbitem?.[acInValue].length === 0) {
                        return []
                    }



                    // Add buttons to each item
                    const itemsWithButtons = mappedItem && mappedItem.length > 0 ? mappedItem.map(item => {
                        return {
                            ...item,
                            actions: (
                                <div className='flex'>
                                    {formDetails?.list_actions?.map(itemAct => (
                                        svgImgPath.filter(filter => filter.svgname === itemAct.name).map((itemImag) => (
                                            <Tooltip key={itemAct.name} label={itemAct.label} color="rgba(64, 64, 64, 1)">
                                                <button
                                                    className='mx-2'
                                                    style={{ width: 'max-content' }}
                                                    onClick={() => dispatch(selectMenuFunction({ name: itemAct.name, opid: formDetails.id, userId: item.userId, deleteId: item.deleteId }))}
                                                >
                                                    <img src={itemImag.svgsrc} alt={itemImag.label} style={{ width: '12px' }} />
                                                </button>
                                            </Tooltip>
                                        ))

                                    ))}
                                </div>
                            )
                        };
                    }) : <p>Nothing to Display</p>;

                    return itemsWithButtons;
                }).flat(); // Flatten the array of arrays
        } else {
            return [];
        }
    }, [TableItemList, formDetails, selectFilterName.filtername, activeInactive, darkModeState]);


    const table = useMantineReactTable({
        columns,
        data, // Initialize with an empty array
        enableRowSelection: true,
        positionToolbarAlertBanner: 'bottom',
        enableColumnOrdering: true,
        renderEmptyRowsFallback: ({ table }) => (
            <div className='flex justify-center items-center' style={{ height: '50vh' }}>
                <div className='flex justify-center items-center flex-col text-sm'>
                    <img src={EmptyData} alt="" srcset="" style={{ width: '200px' }} />
                    <h6 className='text-center font-bold text-stone-300 text-lg'>Oops!</h6>
                    <p className='text-center font-bold text-stone-300 text-lg'>No Records Right Now!</p>
                </div>
            </div>
        ),
        initialState: {
            density: 'xs',
            autoResetPageIndex: true
        },
        paginationDisplayMode: 'pages',
        mantinePaginationProps: {
            showRowsPerPage: false,
        },
        mantineTableProps: {
            sx: {
                'thead > tr': {
                    backgroundColor: '#4B69B6'
                }
            }
        },
        mantineBottomToolbarProps: {
            sx: {
                background: darkModeState.checkvalue ? dayTheme.DmenuCcolor : darkTheme.DmenuCcolor,
            }
        },
        mantineTableBodyRowProps: ({ row }) => ({
            //add onClick to row to select upon clicking anywhere in the row
            onClick: row.getToggleSelectedHandler(),
        }),
        onRowSelectionChange: setRowSelection, //connect internal row selection state to your own
        state: { rowSelection },
        renderBottomToolbarCustomActions: ({ table }) => (
            <Box>
                <div >
                    <div>Heading Time : {Math.floor(LoadheadingTime)} Seconds</div>
                    <div>Loding Data Time :  {Math.floor(loadingTime)} Seconds</div>
                </div>
            </Box>

        ),
        mantineTableContainerProps: { sx: { maxHeight: '60vh', minHeight: '60vh', background: darkModeState.checkvalue ? dayTheme.masterListRowColor : darkTheme.masterListRowColor, color: getrowtextColor(darkModeState.checkvalue) } },
        // renderTopToolbarCustomActions: ({ table }) => (
        mantineTableBodyCellProps: {
            sx: {
                background: darkModeState.checkvalue ? dayTheme.masterListRowColor : darkTheme.masterListRowColor,
                // color: getrowtextColor(darkModeState.checkvalue)

            },
        },


        // ),
        renderTopToolbar: ({ table }) => (
            <div>
                <style>
                    {
                        `
                        .tablearrrowBgColor{
                         background: ${darkModeState.checkvalue ? dayTheme.mobileMenuActiveColor : darkTheme.mobileMenuActiveColor};
                        }

                        `
                    }
                </style>

                <Box className='flex justify-between pt-2' style={{ backgroundColor: darkModeState.checkvalue ? dayTheme.DmenuCcolor : darkTheme.DmenuCcolor }}>
                    <div className='sliderContainer' style={{ display: 'flex', alignItems: 'start' }}>
                        <div className='filterWrapper' style={{ height: '45px',  width: '50vw',display: 'inline-block',overflowX: 'auto',whiteSpace: 'nowrap'}}>
                            {TableItemList.data && TableItemList.data.length > 0 ? (
                                TableItemList.data.map((filterButton, index) => (
                                    <button
                                        key={index}
                                        id={`filter-button-${filterButton.id}`}
                                        className={`${filterButton.name === selectFilterName.filtername
                                            ? `${darkModeState.checkvalue ? 'filterShadow' : 'filterShadow text-white'}`
                                            : 'text-gray-400 border-solid border-2'
                                            } filterWidthHieght rounded px-2 py-1 mx-1`}
                                        onClick={() => handleButtonClick(filterButton)}
                                        style={{ background: filterButton.name === selectFilterName.filtername ? darkModeState.checkvalue ? dayTheme.LabelBarColor : darkTheme.LabelBarColor : '' }}
                                    >
                                        {filterButton.name?.toUpperCase()}
                                    </button>
                                ))
                            ) : (
                                <p></p>
                            )}
                        </div>
                        {TableItemList.data && TableItemList.data.length > 3 ? (
                            <div className='tablearrrowBgColor rounded mt-1 mx-2 d-flex justify-center items-center'>
                                <button onClick={() => document.querySelector('.filterWrapper').scrollBy({ left: -100, behavior: 'smooth' })}>
                                    <img src={LeftArrowImg} style={{ width: '10px' }} className='my-1 mr-1 ml-1' />
                                </button>
                                <button onClick={() => document.querySelector('.filterWrapper').scrollBy({ left: 100, behavior: 'smooth' })}>
                                    <img src={RightArrowImg} className='my-1 mr-1' style={{ width: '10px' }} />
                                </button>
                            </div>
                        ) : null}

                    </div>
                    <div className='flex'>
                        <MRT_GlobalFilterTextInput table={table} />
                        <MRT_ToggleGlobalFilterButton table={table} />
                        <MRT_ToggleFiltersButton table={table} />
                        <MRT_ShowHideColumnsButton table={table} />
                        <MRT_ToggleDensePaddingButton table={table} />
                        <MRT_ToggleFullScreenButton table={table} />
                    </div>

                </Box>
                <div className='flex justify-between' style={{ backgroundColor: darkModeState.checkvalue ? dayTheme.DmenuCcolor : darkTheme.DmenuCcolor }}>
                    <Box sx={{ display: 'flex', gap: '16px', padding: '4px', height: '30px' }}>
                        <button className={`${activeInactive === 'active' ? `${darkModeState.checkvalue ? dayTheme.activeButtonColor : darkTheme.activeButtonColor}  rounded-full text-white px-1 activeWidthHieght activeShadow` : 'activeWidthHieght rounded'}`}
                            onClick={() => setActiveInactive('active')}>
                            Active
                        </button>
                        <button
                            className={`${activeInactive === 'inactive' ? `${darkModeState.checkvalue ? dayTheme.activeButtonColor : darkTheme.activeButtonColor} rounded-full text-white px-1 activeWidthHieght activeShadow` : 'activeWidthHieght rounded'}`}
                            onClick={() => setActiveInactive('inactive')}>
                            InActive

                        </button>
                    </Box>
                    <div>
                        {rowSelectionCount === 0 ?
                            <div className='px-1 pb-1'>
                                <Tooltip label={"Insert"} color="rgba(64, 64, 64, 1)">
                                    <button onClick={() => dispatch(selectMenuFunction({ name: 'Insert', opid: formDetails.id }))}> <img src={PluseIcon} style={{ width: '24px' }} /></button>
                                </Tooltip>
                            </div> : (
                                <div className='flex'>
                                    {formDetails && formDetails?.list_actions?.map((item, index) => (

                                        item.visibility === 'ShowOnSelect' && item.position === 'Global' && (

                                            <div >
                                                {svgImages.filter((filter) => filter.name === item.image).map((imageitem) => (
                                                    <Tooltip key={imageitem.name} label={item.label} color="rgba(64, 64, 64, 1)">
                                                        <button onClick={() => dispatch(selectMenuFunction({ name: item.name, opid: formDetails.id }))}>
                                                            <img src={imageitem.image} className='large-icon px-1' alt={`${item.name} icon`} style={{ filter: darkModeState.checkvalue ? dayTheme.svgImageColor : darkTheme.svgImageColor }} />
                                                        </button>
                                                    </Tooltip>
                                                ))}

                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        ),

    });


    console.log("Tables", formDetails)
    return (
        <div className='w-[100%] sm:mt-[95px] lg:mt-[95px] xl:mt-[95px] shadow'>


            <MantineReactTable
                table={table}
            />



            {/* Relaod Icon */}
            {hiddenReloadIcon && <BeforeLoadTableData />}

            {menuLoaded && <BeforeLoadTableData />}
        </div>
    )
}

export default MasterList


