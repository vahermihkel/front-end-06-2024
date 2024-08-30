import React from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';


function AdminHome() {

	const { t } = useTranslation();
	// return <h1>{t('Welcome to React')}</h1>

	return (
		<div>
			<h1>Admin</h1>
			<Button variant="primary" as={Link as any} to="/admin/maintain-categories">{t("maintain-categories")}</Button>{' '}
			<Button variant="secondary" as={Link as any} to="/admin/maintain-shops">{t("maintain-shops")}</Button>{' '}
			<Button variant="success" as={Link as any} to="/admin/add-product">{t("add-product")}</Button>{' '}
			<Button variant="warning" as={Link as any} to="/admin/maintain-products">{t("maintain-products")}</Button>{' '}
			<Button variant="info" as={Link as any} to="/admin/supplier">{t("supplier")}</Button>{' '}
			<Button variant="dark" as={Link as any} to="/admin/book-supplier">{t("book-supplier")}</Button>
		</div>
	)
}

export default AdminHome