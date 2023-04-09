import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import React, { useEffect, useRef, useState } from 'react';
import { CustomerService } from '../../../demo/service/CustomerService';

function List() {
    const [customers, setCustomers] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const router = useRouter();
    const customerService = new CustomerService();
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const dt = useRef(null);

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    const clearFilter = () => {
        initFilters();
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
        });
        setGlobalFilterValue('');
    };

    useEffect(() => {
        customerService.getCustomersLarge().then((data) => {
            setCustomers(getCustomers(data));
            setLoading(false);
        });
        initFilters();
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Global Search" className="w-full" />
                </span>
                <Button type="button" icon="pi pi-user-plus" label="Add New" className="p-button-outlined w-full sm:w-auto flex-order-0 sm:flex-order-1" onClick={() => router.push('/profile/create')} />
            </div>
        );
    };

    const nameBodyTemplate = (customer) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {customer.name}
            </>
        );
    };

    const countryBodyTemplate = (customer) => {
        return (
            <>
                <img alt={customer.country.name} src={`${contextPath}/demo/images/flag/flag_placeholder.png`} className={'w-2rem mr-2 flag flag-' + customer.country.code} />
                <span className="image-text">{customer.country.name}</span>
            </>
        );
    };

    const createdByBodyTemplate = (customer) => {
        return (
            <div className="inline-flex align-items-center">
                <img alt={customer.representative.name} src={`${contextPath}/demo/images/avatar/${customer.representative.image}`} className="w-2rem mr-2" />
                <span>{customer.representative.name}</span>
            </div>
        );
    };

    const dateBodyTemplate = (customer) => {
        return formatDate(customer.date);
    };

    const activityBodyTemplate = (customer) => {
        return <ProgressBar value={customer.activity} showValue={false} style={{ height: '.5rem' }} />;
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable
                ref={dt}
                value={customers}
                header={header}
                paginator
                rows={10}
                responsiveLayout="scroll"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                loading={loading}
            >
                <Column field="name" header="Name" sortable body={nameBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '25%' }}></Column>
                <Column field="country.name" header="Country" sortable body={countryBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '25%' }}></Column>
                <Column field="date" header="Join Date" sortable body={dateBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '25%' }}></Column>
                <Column field="representative.name" header="Created By" body={createdByBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '25%' }} sortable></Column>
                <Column field="activity" header="Activity" body={activityBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '25%' }} sortable></Column>
            </DataTable>
        </div>
    );
}

export default List;
