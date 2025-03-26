import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { RepaymentTableView } from "../list/RepaymentTableView";

export const RepaymentList = () => {
  return (
    <div className=' grid'>
        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <RepaymentTableView />
        </div>
    </div>
  )
}
