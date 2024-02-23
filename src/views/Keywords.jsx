import React, { useState, useEffect } from 'react';
import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import TagIcon from '@mui/icons-material/Tag';
import { getKeywordList, updateBlockList } from '../constants/popup';
import { InfoTooltip } from '../components';

const Keywords = ({ }) => {
    const [blockListData, setBlockListData] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blockList = await getKeywordList();
                setBlockListData(blockList);
            } catch (error) {
                console.error('Error fetching switch data:', error);
            }
        };

        fetchData();
    }, []);

    const updateBlockListData = async (value, action, list) => {
        await updateBlockList(value, action, list);
        const updatedBlockList = await getKeywordList();
        setBlockListData(updatedBlockList);
    };

    function blockListAdd(list) {
        if (/^\s*$/.test(inputValue)) return;
        updateBlockListData(inputValue.toLowerCase(), 'add', list);
        setInputValue('');
    }

    function blockListRemove(item, list) {
        updateBlockListData(item, 'remove', list);
    }

    function blockListClear(list) {
        updateBlockListData('', 'clear', list);
    }

    const DeleteIcon = (props) => (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );

    const buttonColor = !inputValue.length ? 'bg-[#bbbbbb]' : 'bg-[#3694ff] hover:bg-[#2c85e9]';

    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='flex flex-col w-full mt-4'>

                <div className='flex items-center gap-1 mb-8'>
                    <p className='text-[16px] font-medium'>Keyword Blocking</p>
                    <InfoTooltip content={`Any post titles or bodies containing these keywords will be removed from your feed`} />
                </div>

                <div className='flex flex-row items-center gap-2 mb-8'>
                    <Input
                        startContent={<TagIcon className={`w-[18px] text-[#262626]`} />}
                        placeholder="trump"
                        aria-label='channel name'
                        labelPlacement="outside"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} />

                    <Button
                        auto
                        disabled={!inputValue.length}
                        className={`text-white ${buttonColor}`}
                        onPress={() => { blockListAdd('keyword') }}>
                        Add
                    </Button>
                </div>

                {blockListData.length > 0 ? (
                    <>
                        <Table
                            aria-label="block list data">
                            <TableHeader>
                                <TableColumn>Blocklist</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {blockListData.map((item, index) => (
                                    <TableRow className='hover:bg-[#f4f4f5]' key={index}>
                                        <TableCell className='rounded-md'>
                                            <div className='flex items-center rounded-md'>
                                                <div className='w-full'>
                                                    <p className='text-[12px]'>
                                                        {item.length <= 22 ? (
                                                            item
                                                        ) : (
                                                            item.slice(0, 22) + '..'
                                                        )}
                                                    </p>
                                                </div>
                                                <DeleteIcon onClick={() => blockListRemove(item, 'keyword')} className="text-lg text-danger cursor-pointer active:opacity-50">
                                                </DeleteIcon>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Button
                            auto
                            className={`h-[32px] mt-6 text-white bg-[#F31260] hover:bg-[#be0848]`}
                            color='error'
                            onPress={() => { blockListClear('keyword') }}>
                            Remove All
                        </Button>
                    </>
                ) : (
                    <Table aria-label="block list data">
                        <TableHeader>
                            <TableColumn>Blocklist</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key='1'>
                                <TableCell>
                                    <p className='text-[12px]'>
                                        No blocked keywords
                                    </p>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                )}
            </div>
        </div >
    )
};

export default Keywords;