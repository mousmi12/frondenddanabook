import { Box, Button, Flex, Group, Select } from '@mantine/core';
import { MantineReactTable, useMantineReactTable, MRT_ToggleFiltersButton, MRT_ToggleGlobalFilterButton, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton, MRT_ShowHideColumnsButton, MRT_GlobalFilterTextInput } from 'mantine-react-table';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconColumns } from '@tabler/icons-react';
import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyData from '../../asset/Menusvg/main/emptydata.png'
import BeforeLoadTableData from '../CommanCoponent/BeforeLoadTableData';
import { BaseURL } from '../Masters/masterPagefunctions';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';

function ReportMainCom({ formDetails }) {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDateFilter, setSelectedDateFilter] = useState('Today'); // State for selected date filter
  const [tempDateFilter, setTempDateFilter] = useState('Today'); // Temporary state for the Select value
  const dispatch = useDispatch();
  const [activeInactive, setActiveInactive] = useState('active');
  const [menuLoaded, setMenuLoaded] = useState(false);
  // dark mode
  const darkModeState = useSelector((state) => state.darkMode)

  useEffect(() => {
    if (formDetails) {
      setReports(formDetails);
      if (formDetails.length > 0) {
        setSelectedReport(formDetails[0]); // Select the first report by default
        fetchReportData(formDetails[0], selectedDateFilter); // Fetch data for the first report with date filter
      } else {
        console.warn('No reports available'); // Debugging log
      }
    }
    setLoading(false);
  }, [formDetails, selectedDateFilter]); // Add formDetails and selectedDateFilter as dependencies to refetch data when they change

  const fetchReportData = (report, dateFilter) => {
    const apiendpoint = report.header.apiendpoint;
    const apiarguments = report.header.apiarguments;
    const apiServiceName = report.header.apiservicename


    console.log("servicebname", apiarguments[0], apiendpoint, apiServiceName);
    const apiUrl = `https://${apiServiceName}.${BaseURL}${apiendpoint}`;

    console.log("apiUrl", apiUrl);


    // Determine fromdate and todate based on the selected date filter
    let fromdate, todate;
    const today = new Date();
    switch (dateFilter) {
      case 'Today':
        fromdate = todate = today.toISOString().split('T')[0];
        break;
      case 'Current Month':
        fromdate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        todate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
        break;
      case 'Previous Month':
        fromdate = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
        todate = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0];
        break;
      default:
        fromdate = todate = today.toISOString().split('T')[0];
    }

    const urlWithArgs = `${apiUrl}/${apiarguments[0]}?fromdate=${fromdate}&todate=${todate}`;
    console.log("urlWithArgs", urlWithArgs);
    setMenuLoaded(true);
    fetch(urlWithArgs)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Report Data:', data); // Debugging log
        if (data && Array.isArray(data.data)) {
          setReportData(data.data); // Ensure data is an array before setting it
        } else {
          console.error('Fetched data is not in the expected format:', data);
          setReportData([]); // Set an empty array if data is not in the expected format
        }
      })
      .catch(error => {
        console.error('Error fetching report data:', error); // Debugging log
        setReportData([]); // Set an empty array in case of error
      })
      .finally(() => {
        setMenuLoaded(false); // Set loading state to true after data is fetched
      });
  };

  const handleReportClick = (report) => {
    console.log('Report clicked:', report); // Debugging log

    if (!report || !report.header) {
      return [];
    }

    setSelectedReport(report);
    fetchReportData(report, selectedDateFilter);
  };

  const handleGetReportClick = () => {
    setSelectedDateFilter(tempDateFilter);
    if (selectedReport) {
      fetchReportData(selectedReport, tempDateFilter);
    }
  };

  const formatData = (value, column) => {
    if (!value || !column.dataformat) return value;
    switch (column.datatype) {
      case 'Date':
        return moment(value).format(column.dataformat.toUpperCase());
      case 'Number':
        return numeral(value).format(column.dataformat);
      default:
        return value;
    }
  };

  const columns = useMemo(() => {
    if (!selectedReport) return [];
    return selectedReport.columns
      .filter(column => column.visible)
      .map(column => ({
        accessorKey: column.columnname,
        header: column.label,
        size: column.width,
        Header: ({ column }) => (
          <h1 style={{ color: 'white' }}>{column.columnDef.header}</h1>
        ),
        Cell: ({ cell }) => formatData(cell.getValue(), column), // Format data in cells
      }));
  }, [selectedReport]);


  const data = useMemo(() => {
    if (!selectedReport) return [];
    if (!reportData) return [];

    return reportData.map(item => {
      const row = {};
      selectedReport.columns.forEach(column => {
        row[column.columnname] = formatData(item[column.columnname], column); // Format data here as well
      });
      return row;
    });
  }, [selectedReport, reportData]);



  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    positionToolbarAlertBanner: 'bottom',
    enableColumnOrdering: true,
    mantineTableContainerProps: { sx: { maxHeight: '59vh', minHeight: '59vh', background: darkModeState.checkvalue ? dayTheme.masterListRowColor : darkTheme.masterListRowColor } },
    initialState: {
      density: 'xs',
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
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
    mantineTableBodyCellProps: {
      sx: {
        background: darkModeState.checkvalue ? dayTheme.masterListRowColor : darkTheme.masterListRowColor,
        // color: getrowtextColor(darkModeState.checkvalue)

      },
    },
    mantineBottomToolbarProps: {
      sx: {
        background: darkModeState.checkvalue ?dayTheme.DmenuCcolor : darkTheme.DmenuCcolor,
      }
    },
    enableColumnOrdering: true,
    paginationDisplayMode: "pages",// Set pagination display mode to pages
    // renderBottomToolbar: ({ table }) => {
    //   console.log('Table State:', table.state); // Debugging: check table state
    //   console.log('Page Count:', table.getPageCount()); // Debugging: check page count
    //   return (
    //     <Box>
    //       <div>Custom Pagination Controls</div>
    //       <Group>
    //         <button onClick={() => table.previousPage()}>
    //           Previous
    //           <table className="getPageCount"></table>
    //         </button>
    //         {Array.from({ length: table.getPageCount() }, (_, index) => (
    //           <button
    //             key={index}
    //             variant={table.getState().pagination.pageIndex === index ? 'filled' : 'outline'}
    //             onClick={() => table.setPageIndex(index)}
    //             color='red'
    //           >
    //             {index + 1}
    //           </button>
    //         ))}
    //         <button onClick={() => table.nextPage()}>
    //           Next
    //         </button>
    //       </Group>
    //     </Box>
    //   )
    // },
    renderEmptyRowsFallback: ({ table }) => (
      <div className='flex justify-center items-center' style={{ height: '49vh' }}>
        <div className='flex justify-center items-center flex-col text-sm'>
          <img src={EmptyData} alt="" srcset="" style={{ width: '200px' }} />
          <h6 className='text-center font-bold text-stone-300 text-lg'>Oops!</h6>
          <p className='text-center font-bold text-stone-300 text-lg'>No Records Right Now!</p>
        </div>
      </div >
    ),

    //positionToolbarAlertBanner: 'top-inside',
    renderTopToolbar: ({ table }) => (
      <Box className='flex justify-between py-2' style={{ backgroundColor: darkModeState.checkvalue ? dayTheme.DmenuCcolor : darkTheme.DmenuCcolor }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
          <div className='sliderContainer' style={{ display: 'flex', alignItems: 'start' }}>
            <div className='filterWrapper' style={{ height: '45px', width:'50vw', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {reports.map(report => (
                <button
                  key={report.header.id}
                  onClick={() => handleReportClick(report)}
                  className={`${report.header.id === selectedReport.header.id ? `${darkModeState.checkvalue ? 'filterShadow' : 'filterShadow text-white'}` : 'text-gray-400 border-solid border-2'} filterWidthHieght rounded px-2 py-1 mx-1`}
                  style={{ background: report.header.id === selectedReport.header.id ? darkModeState.checkvalue ? dayTheme.LabelBarColor : darkTheme.LabelBarColor : '' }}
                >
                  {report.header.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: '16px', padding: '4px' }}>
              <button
                className={`${activeInactive === 'active' ? `${darkModeState.checkvalue ? dayTheme.activeButtonColor : darkTheme.activeButtonColor} rounded-full text-white px-1 activeWidthHieght activeShadow` : 'activeWidthHieght rounded'}`}
                onClick={() => setActiveInactive('active')}
              >
                Active
              </button>
              <button
                className={`${activeInactive === 'inactive' ? `${darkModeState.checkvalue ? dayTheme.activeButtonColor : darkTheme.activeButtonColor} rounded-full text-white px-1 activeWidthHieght activeShadow` : 'activeWidthHieght rounded'}`}
                onClick={() => setActiveInactive('inactive')}
              >
                Inactive
              </button>
            </Box>

          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <div className='flex justify-end'>

            <div className='flex'>
              <MRT_GlobalFilterTextInput table={table} />
              <MRT_ToggleGlobalFilterButton table={table} />
              <MRT_ToggleFiltersButton table={table} />
              <MRT_ShowHideColumnsButton table={table} />
              <MRT_ToggleDensePaddingButton table={table} />
              <MRT_ToggleFullScreenButton table={table} />
            </div>

          </div>
          <div className='flex justify-center items-center mx-1'>
            <Select
              value={tempDateFilter}
              onChange={(value) => setTempDateFilter(value)}
              data={[
                { value: 'Today', label: 'Today' },
                { value: 'Current Month', label: 'Current Month' },
                { value: 'Previous Month', label: 'Previous Month' },
              ]}
              sx={{
                '.mantine-1cn2mlo': {
                  height: '25px',
                  minHeight: '25px',
                  width: '133px',
                  backgroundColor: '#d9d9d9',
                  color: 'white',
                  border: '0px',
                }
              }}
            />
            <button
              className={`rounded-full text-white mx-1 px-1`}
              onClick={handleGetReportClick} // Update this line
              style={{ height: '20px', width: '67px', fontSize: '10px', background: darkModeState.checkvalue ? dayTheme.ReportButtonColor : darkTheme.ReportButtonColor }}
            >
              Get Report
            </button>
          </div>
        </div>
      </Box>
    ),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedReport) {
    return <div>No report selected.</div>; // Handle case where no report is selected
  }



  return (
    <div className='w-[100%] sm:mt-[95px] lg:mt-[95px] xl:mt-[95px] shadow'>
      <MantineReactTable table={table} />

      {menuLoaded && <BeforeLoadTableData />}

    </div>
  );
}

export default ReportMainCom;
