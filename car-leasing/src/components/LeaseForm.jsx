import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createLease } from '../store/actions';
import api from '../services/api';

const LeaseForm = ({ car }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
    personalNumber: '',      // Персональный номер (14 цифр)
    documentId: '',          // ID документа (7 цифр)
    issueDate: '',        
    expiryDate: '',        
    term: 12
  });

  const [errors, setErrors] = useState({
    personalNumber: '',
    documentId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
   
    if (name === 'personalNumber') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 14) {
        setFormData({
          ...formData,
          [name]: numbersOnly
        });
        setErrors({
          ...errors,
          personalNumber: numbersOnly.length === 14 ? '' : 'Должно быть ровно 14 цифр'
        });
      }
    }
    
    else if (name === 'documentId') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 7) {
        setFormData({
          ...formData,
          [name]: numbersOnly
        });
        setErrors({
          ...errors,
          documentId: numbersOnly.length === 7 ? '' : 'Должно быть ровно 7 цифр'
        });
      }
    }
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверка на ошибки валидации
    if (errors.personalNumber || errors.documentId) {
      alert('Пожалуйста, исправьте ошибки в форме');
      return;
    }

    // Проверка на точное количество цифр
    if (formData.personalNumber.length !== 14) {
      alert('Персональный номер должен содержать ровно 14 цифр');
      return;
    }
    
    if (formData.documentId.length !== 7) {
      alert('ID документа должен содержать ровно 7 цифр');
      return;
    }

    if (!agreed) {
      alert('Пожалуйста, согласитесь с условиями договора');
      return;
    }
    
    // Объединяем ФИО в одну строку для сохранения
    const fullName = `${formData.lastName} ${formData.firstName} ${formData.middleName}`.trim();
    
    const leaseData = {
      ...formData,
      fullName,
      carId: car.id,
      carName: `${car.brand} ${car.model}`,
      amount: car.price,
      date: new Date().toISOString().split('T')[0]
    };

    const result = await api.createLease(leaseData);
    dispatch(createLease(result));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="success-message">
        <h3>Заявка успешно отправлена!</h3>
        <p>Ваша заявка на лизинг {car.brand} {car.model} принята и находится на рассмотрении.</p>
        <p>Мы свяжемся с вами в ближайшее время.</p>
        <button onClick={() => navigate('/my-leasings')}>
          Перейти к моим оформлениям
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="lease-form">
      <h2>Оформление лизинга</h2>
      <p style={{textAlign: 'center', marginBottom: '2rem', color: 'var(--gold-dark)'}}>
        {car.brand} {car.model}
      </p>
      
      <div className="form-section">
        <h3>Личные данные</h3>
        
        <div className="form-group">
          <label>Фамилия *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Имя *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Отчество</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Номер телефона *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+7 (999) 123-45-67"
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="car_leasing@gmail.com"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Паспортные данные</h3>
        
    
        <div className="form-group">
          <label>Персональный номер *</label>
          <input
            type="text"
            name="personalNumber"
            value={formData.personalNumber}
            onChange={handleChange}
            required
            placeholder="12345678901234"
            maxLength="14"
          />
          {errors.personalNumber && (
            <small style={{color: 'var(--status-rejected)', marginTop: '5px', display: 'block'}}>
              {errors.personalNumber}
            </small>
          )}
        </div>

    
        <div className="form-group">
          <label>ID документа *</label>
          <input
            type="text"
            name="documentId"
            value={formData.documentId}
            onChange={handleChange}
            required
            placeholder="1234567"
            maxLength="7"
          />
          {errors.documentId && (
            <small style={{color: 'var(--status-rejected)', marginTop: '5px', display: 'block'}}>
              {errors.documentId}
            </small>
          )}
        </div>

    
        <div className="form-group">
          <label>Дата выдачи *</label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <label>Срок действия *</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Условия лизинга</h3>
        <div className="form-group">
          <label>Срок лизинга (месяцев) *</label>
          <select
            name="term"
            value={formData.term}
            onChange={handleChange}
            required
          >
            <option value={12}>12 месяцев</option>
            <option value={24}>24 месяца</option>
            <option value={36}>36 месяцев</option>
            <option value={48}>48 месяцев</option>
            <option value={60}>60 месяцев</option>
          </select>
        </div>

        <div className="contract-text">
          <h4>ДОГОВОР ЛИЗИНГА (ОФЕРТА)</h4>
          <p>1. ПРЕДМЕТ ДОГОВОРА</p>
          <p>1.1. Лизингодатель обязуется приобрести в собственность указанное Лизингополучателем имущество у определенного продавца и предоставить Лизингополучателю это имущество за плату во временное владение и пользование.</p>
          <p>1.2. Предметом лизинга является автомобиль {car.brand} {car.model} стоимостью {car.price.toLocaleString()} ₽.</p>
          
          <p>2. ПЛАТЕЖИ И ПОРЯДОК РАСЧЕТОВ</p>
          <p>2.1. Первоначальный взнос: 20% от стоимости автомобиля.</p>
          <p>2.2. Ежемесячный платеж: рассчитывается индивидуально.</p>
          <p>2.3. Срок лизинга: {formData.term} месяцев.</p>
          
          <p>3. ПРАВА И ОБЯЗАННОСТИ СТОРОН</p>
          <p>3.1. Лизингополучатель обязуется своевременно вносить лизинговые платежи.</p>
          <p>3.2. Лизингополучатель обязуется поддерживать предмет лизинга в исправном состоянии.</p>
          <p>3.3. Лизингодатель имеет право проверять состояние предмета лизинга.</p>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="agree">
            Я согласен с условиями договора и обработкой персональных данных
          </label>
        </div>
      </div>

      <button type="submit" className="submit-button">
        Оформить лизинг
      </button>
    </form>
  );
};

export default LeaseForm;