// eslint-disable-next-line no-unused-vars
import React from 'react';

const finalCon = data => (<table className="single-order animated slideInLeft">
    <tbody>
      <tr></tr>
      <tr>
        <td><b>Item Name</b></td>
        <td>{data.item_name}</td>
      </tr>

      <tr>
        <td><b>Status</b></td>
        <td><span className={data.status}>{data.status}</span></td>
      </tr>

      <tr>
        <td> <b>Destination</b></td>
        <td>{data.destination_address}</td>
      </tr>

      <tr>
        <td><b>Pickup Address</b></td>
        <td>{data.pickup_address} </td>
      </tr>

      <tr>
        <td><b>Current location</b></td>
        <td> {data.currentlocation} </td>
      </tr>
      <tr>
        <td><b>Receiver Name</b></td>
        <td>{data.receiver_name} </td>
      </tr>
      <tr>
        <td><b>Receiver Email</b></td>
        <td>{data.receiver_email} </td>
      </tr>
      <tr>
        <td><b>Item Weight</b></td>
        <td>{data.item_weight} </td>
      </tr>

    </tbody>
  </table>);

export default finalCon;
