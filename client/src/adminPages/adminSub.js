import React, { useState, useEffect } from "react";
import NavBar from '../templates/header';
import { GetSubTypes, createSub } from '../http/subApi';
import "../assets/adminCSS/sub-admin.scss";
import editSub from "../assets/images/editSub.png";
import delSub from "../assets/images/delSub.png";

const AdminSub = () => {
  const [subs, setSubs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSub, setNewSub] = useState({
    title: '',
    duration: '',
    description: '',
    price: '',
    salePrice: '',
    sale: false
  });

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const response = await GetSubTypes();
        setSubs(response.data);
      } catch (error) {
        console.error("Ошибка при получении подписок:", error);
      }
    };

    fetchSubs();
  }, []);

  const handleEdit = (id) => {
    console.log("Редактировать подписку с ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Удалить подписку с ID:", id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSub(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSub = async (e) => {
    e.preventDefault();

    const payload = {
      title: newSub.title,
      duration: +newSub.duration,
      description: newSub.description,
      price: +newSub.price,
      salePrice: newSub.salePrice ? +newSub.salePrice : null,
    };

    try {
      await createSub(payload); // 👈 Отправка данных на сервер

      // Получаем обновлённый список подписок из БД
      const updatedSubs = await GetSubTypes();
      setSubs(updatedSubs.data);

      // Сброс формы
      setNewSub({ title: '', duration: '', description: '', price: '', salePrice: '', sale: false });
      setShowForm(false);
    } catch (error) {
      console.error("Ошибка при добавлении подписки:", error);
    }
  };


  return (
    <div>
      <NavBar />
      <div className="info-sub-admin">
        <p className="zag-sub-admin">Наши подписки</p>

        <button className="add-sub-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Скрыть форму" : "Добавить подписку"}
        </button>

        {showForm && (
          <form className="sub-form" onSubmit={handleAddSub}>
            <input type="text" name="title" placeholder="Название" value={newSub.title} onChange={handleInputChange} required />
            <input type="number" name="duration" placeholder="Срок действия (дней)" value={newSub.duration} onChange={handleInputChange} required />
            <input type="text" name="description" placeholder="Описание" value={newSub.description} onChange={handleInputChange} required />
            <input type="number" name="price" placeholder="Цена" value={newSub.price} onChange={handleInputChange} required />
            <input type="number" name="salePrice" placeholder="Цена со скидкой (необязательно)" value={newSub.salePrice} onChange={handleInputChange} />
            <button type="submit">Добавить</button>
          </form>
        )}

        <table className="sub-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Название</th>
              <th>Срок действия (дней)</th>
              <th>Описание</th>
              <th>Цена</th>
              <th>Цена со скидкой</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((sub, index) => (
              <tr key={sub.id}>
                <td>{index + 1}</td>
                <td>{sub.title}</td>
                <td>{sub.duration}</td>
                <td>{sub.description}</td>
                <td>{sub.price}₽</td>
                <td>{sub.sale ? `${sub.salePrice}₽` : "-"}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(sub.id)}>
                    <img src={editSub} className="edit-del-icon" alt="edit" />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(sub.id)}>
                    <img src={delSub} className="edit-del-icon" alt="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSub;
