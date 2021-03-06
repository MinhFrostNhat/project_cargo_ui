import React, { useEffect, useState } from 'react';
import {
  Breadcrumb, Card, Col, Row
} from 'react-bootstrap';
import { toast } from 'react-toastify';


import TripCardRiderH from './TripCardRiderhistory';
import { connect, getTrips, messages } from '../services/TripService';

function Riderhistory (props) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      const { response, isError } = await getTrips();
      if (isError) {
        setTrips([]);
      } else {
        setTrips(response.data);
      }
    }
    loadTrips();
  }, []);

  useEffect(() => {
    connect();
    const subscription = messages.subscribe((message) => {
      setTrips(prevTrips => [
        ...prevTrips.filter(trip => trip.id !== message.data.id),
        message.data
      ]);
      updateToast(message.data);
    });
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }, [setTrips]);


  const getCompletedTrips = () => {
    return trips.filter(trip => {
      return trip.status === 'COMPLETED'
    });
  };

  const updateToast = (trip) => {
    if (trip.status === 'STARTED') {
      toast.success(`Driver ${trip.driver.first_name} is coming to Send your cargo.`);
    } else if (trip.status === 'IN_PROGRESS') {
      toast.success(`Driver ${trip.driver.first_name} is headed to your destination.`);
    } else if (trip.status === 'COMPLETED') {
      toast.success(`Driver ${trip.driver.first_name} has dropped cargo off.`);
    }
  };

  return (
    <Row>
      
      <Col lg={12}>
      <Card>
        <Breadcrumb>
          <Breadcrumb.Item href='/rider'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>History</Breadcrumb.Item>
        </Breadcrumb>
        </Card>

        <TripCardRiderH
          title='Recent Trips'
          trips={getCompletedTrips()}
          group='rider'
          otherGroup='driver'
        />

      </Col>
    </Row>
  );
}

export default Riderhistory;