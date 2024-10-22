import React, { useCallback, useEffect, useState } from 'react'
import { dashboardService } from '../dashboardService';
import { useDispatch } from 'react-redux';
import numeral from "numeral";

export const DashboardList = () => {

  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(null);
  const dispatch = useDispatch()

  const loadingCountStatus = useCallback(async () => {
    setLoading(true);
    const result = await dashboardService.countIndex(dispatch);
    if (result.status === 200) {
      setCount(result.data);
    }
    setLoading(false)
  }, [dispatch])

  useEffect(() => {
    loadingCountStatus()
  }, [loadingCountStatus])


  return (
    <div className='p-5'>
      {!loading && count && (
        <div className='grid'>
          <div className='col-12 mt-3 mb-3'>
            <h1 style={{ fontSize: "30px" }}> Accounts </h1>
          </div>

          <div className='col-12 md:col-6 lg:col-3 flex justify-content-center'>
            <div className='count-card'>
              <div className='h-126 p-3'>
                <div className='flex align-items-center justify-content-between'>
                  <div>
                    <h2 className='font-bold text-gray'> Partner Account</h2>
                  </div>
                  <div className='count-status count-total'> Total </div>
                </div>
                <div className='h-60 text-gray flex align-items-center justiry-content-start gap-5'>
                  <i className='pi pi-users' style={{ fontSize: "3rem" }}></i>
                  <div style={{ fontSize: "2.5rem" }}>{count.partners}</div>
                </div>
              </div>
              <div className=' mt-auto h-40 count-view total flex align-items-center justify-content-center'>
                View More
              </div>
            </div>
          </div>

          <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
            <div className=' count-card'>
              <div className=' h-126 p-3'>
                <div className=' flex align-items-center justify-content-between'>
                  <div>
                    <h2 className=' font-bold text-gray'> Main Agent </h2>
                  </div>
                  <div className=' count-status count-verified'>  Total </div>
                </div>
                <div className=' h-60 text-gray flex align-items-center justiry-content-start gap-5'>
                  <i className=' pi pi-users' style={{ fontSize: "3rem" }}></i>
                  <div style={{ fontSize: "2.5rem" }}>{count.main_agents}</div>
                </div>
              </div>
              <div className=' mt-auto h-40 count-view verified flex align-items-center justify-content-center'>
                View More
              </div>
            </div>
          </div>

          <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
            <div className=' count-card'>
              <div className=' h-126 p-3'>
                <div className=' flex align-items-center justify-content-between'>
                  <div>
                    <h2 className=' font-bold text-gray'> Sub Agents </h2>
                  </div>
                  <div className=' count-status count-pending'> Total </div>
                </div>
                <div className=' h-60 text-gray flex align-items-center justiry-content-start gap-5'>
                  <i className=' pi pi-users' style={{ fontSize: "3rem" }}></i>
                  <div style={{ fontSize: "2.5rem" }}>{count.sub_agents}</div>
                </div>
              </div>
              <div className=' mt-auto h-40 count-view pending flex align-items-center justify-content-center'> View More </div>
            </div>
          </div>

          <div className='col-12 mt-3 mb-3'>
            <h1 style={{ fontSize: "30px" }}> Deposits </h1>
          </div>

          <div className='col-12 md:col-6 lg:col-3 flex justify-content-center'>
            <div className='count-card'>
              <div className='h-126 p-3'>
                <div className='flex align-items-center justify-content-between'>
                  <div>
                    <h2 className='font-bold text-gray'> Partner Deposit Amount </h2>
                  </div>
                  <div className='count-status count-total'> Total </div>
                </div>
                <div className='h-60 text-gray flex align-items-center justiry-content-start gap-5'>
                  <i className='pi pi-users' style={{ fontSize: "3rem" }}></i>
                  <div style={{ fontSize: "2.5rem" }}>{count.partner_deposit}</div>
                </div>
              </div>
              <div className=' mt-auto h-40 count-view total flex align-items-center justify-content-center'>
                View More
              </div>
            </div>
          </div>

          <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
            <div className=' count-card'>
              <div className=' h-126 p-3'>
                <div className=' flex align-items-center justify-content-between'>
                  <div>
                    <h2 className=' font-bold text-gray'> Agent Deposit Amount</h2>
                  </div>
                  <div className=' count-status count-verified'>  Total </div>
                </div>
                <div className=' h-60 text-gray flex align-items-center justiry-content-start gap-5'>
                  <i className=' pi pi-users' style={{ fontSize: "3rem" }}></i>
                  <div style={{ fontSize: "2.5rem" }}>{numeral(count.agent_deposit).format('0,0')}</div>
                </div>
              </div>
              <div className=' mt-auto h-40 count-view verified flex align-items-center justify-content-center'>
                View More
              </div>
            </div>
          </div>

          <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
            <div className=' count-card'>
              <div className=' h-126 p-3'>
                <div className=' flex align-items-center justify-content-between'>
                  <div>
                    <h2 className=' font-bold text-gray'> Total Deposit </h2>
                  </div>
                  <div className=' count-status count-pending'> Total </div>
                </div>
                <div className=' h-60 text-gray flex align-items-center justiry-content-start gap-5'>
                  <i className=' pi pi-users' style={{ fontSize: "3rem" }}></i>
                  <div style={{ fontSize: "2.5rem" }}>{numeral(count.partner_deposit + count.agent_deposit).format("0,0")}</div>
                </div>
              </div>
              <div className=' mt-auto h-40 count-view pending flex align-items-center justify-content-center'> View More </div>
            </div>
          </div>

          <div className='col-12 mt-3 mb-3'>
            <h1 style={{ fontSize: "30px" }}> Monthly Repayment </h1>
          </div>

          <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
            <div className=' count-card'>
              <div className=' h-126 p-3'>
                <div className=' flex align-items-center justify-content-between'>
                  <div>
                    <h2 className=' font-bold text-gray'> Monthly Repayment Amount </h2>
                  </div>
                  <div className=' count-status count-pending'> Total </div>
                </div>
                <div className=' h-60 text-gray flex align-items-center justiry-content-start gap-5'>
                  <i className=' pi pi-users' style={{ fontSize: "3rem" }}></i>
                  <div style={{ fontSize: "2.5rem" }}>{numeral(count.repayment_amount).format("0,0")}</div>
                </div>
              </div>
              <div className=' mt-auto h-40 count-view pending flex align-items-center justify-content-center'> View More </div>
            </div>
          </div>
        </div>

      )}
    </div>
  )
}
