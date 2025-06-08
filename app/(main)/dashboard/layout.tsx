import React, { Suspense } from 'react'
import DashboardPage from './page'
import { BarLoader } from 'react-spinners'

const DashboardLayout = () => {
  return (
    <div className='px-5'>
        <h1 className='text-6xl font-bold mb-5 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600'>Dashboard</h1>
        {/*Dashboard page*/}
        <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='#9333ea'/>}>
            <DashboardPage></DashboardPage>
        </Suspense>
    </div>
  )
}

export default DashboardLayout