import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { CartContext } from '../contexts/CartContext';
import Header from '../components/Header'
import { FiTrash2 } from 'react-icons/fi';
import LoadingModal from '../components/Loading';

const Checkout = () => {
    return (
        <>
            <Header />
        </>
    )
}

export default Checkout
