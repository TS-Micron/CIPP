import React from 'react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import TenantSelector from 'src/components/cipp/TenantSelector'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { faUser, faCog, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CippDatatable, cellBooleanFormatter } from '../../../components/cipp'

const dropdown = (row, rowIndex, formatExtraData) => {
  return (
    <CDropdown style={{ position: 'fixed', zIndex: 1000 }}>
      <CDropdownToggle size="sm" color="link">
        <FontAwesomeIcon icon={faBars} />
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem href="#">
          <Link
            className="dropdown-item"
            to={`/identity/administration/users/view?userId=${row.id}&tenantDomain=${row.primDomain}`}
          >
            <FontAwesomeIcon icon={faUser} className="me-2" />
            View User
          </Link>
        </CDropdownItem>
        <CDropdownItem href="#">
          <Link
            className="dropdown-item"
            to={`/identity/administration/users/edit?userId=${row.id}&tenantDomain=${row.primDomain}`}
          >
            <FontAwesomeIcon icon={faCog} className="me-2" />
            Edit User
          </Link>
        </CDropdownItem>
        <CDropdownItem href="#">
          <Link className="dropdown-item" to={`/identity/administration/ViewBec`}>
            <FontAwesomeIcon icon={faUser} className="me-2" />
            Research Compromised Account
          </Link>
        </CDropdownItem>
        <CDropdownItem href="#">Send MFA Push To User</CDropdownItem>
        <CDropdownItem href="#">Convert To Shared</CDropdownItem>
        <CDropdownItem href="#">Block Sign-in</CDropdownItem>
        <CDropdownItem href="#">Reset Password (Must Change)</CDropdownItem>
        <CDropdownItem href="#">Reset Password</CDropdownItem>
        <CDropdownItem href="#">Delete User</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

const columns = [
  {
    name: 'Display Name',
    selector: (row) => row['displayName'],
    sortable: true,
  },
  {
    name: 'Email',
    selector: (row) => row['mail'],
    sortable: true,
  },
  {
    name: 'User Type',
    selector: (row) => row['userType'],
    sortable: true,
  },
  {
    name: 'Account Enabled',
    selector: (row) => row['accountEnabled'],
    cell: cellBooleanFormatter(),
    sortable: true,
  },
  {
    name: 'On Premise Sync',
    selector: (row) => row['onPremisesSyncEnabled'],
    cell: cellBooleanFormatter(),
    sortable: true,
  },
  {
    name: 'Licenses',
    selector: (row) => 'Click to Expand',
  },
  {
    name: 'Action',
    button: true,
    cell: dropdown,
  },
]

const Users = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  // eslint-disable-next-line react/prop-types
  const ExpandedComponent = ({ data }) => (
    // eslint-disable-next-line react/prop-types
    <pre>{JSON.stringify(data.LicJoined, null, 2)}</pre>
  )

  return (
    <div>
      <TenantSelector />
      <hr />
      <div className="bg-white rounded p-5">
        <h3>Users</h3>
        {Object.keys(tenant).length === 0 && <span>Select a tenant to get started.</span>}
        <CippDatatable
          tableProps={{
            expandableRows: true,
            expandableRowsComponent: ExpandedComponent,
            expandOnRowClicked: true,
          }}
          reportName={`${tenant?.defaultDomainName}-Users`}
          path="/api/ListUsers"
          columns={columns}
          params={{ TenantFilter: tenant?.defaultDomainName }}
        />
      </div>
    </div>
  )
}

export default Users