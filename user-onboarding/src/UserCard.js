import React from 'react'

function UserCard({ details }) {
  if (!details) {
    return <h3>Working fetching your user&apos;s details...</h3>
  }

  return (
    <div className='friend container'>
      <h2>{details.first_name}</h2>
      <h2>{details.last_name}</h2>
      <p>Email: {details.email}</p>
    </div>
  )
}

export default UserCard;
