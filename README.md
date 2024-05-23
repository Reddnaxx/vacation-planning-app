# СЕРВИС ПЛАНИРОВАНИЯ ОТПУСКА В КОМПАНИИ
Приложение, представляет собой сервис,
в котором можно запланировать отпуск или отгул в своей компании.
Присутствует распределение на роли сотрудника и управляющего. Управляющие сами создают
свои аккаунты и добавляют сотрудников в свои отделы. И сотрудники и управляющие могут 
отправлять запросы на отпуск. Управляющие в свою очередь рассматривают заявки
и либо одобряют их, либо отклоняют.

## Содержание
- <a href = "#start">Как запустить проект?</a>
- <a href = "#stack">Стек технологий</a>
- <a href = "#func">Примерный функционал</a>
- <a href = "#participants">Участники</a>
- <a href = "#grade">Таблица выполнения технического грейда приложения</a>

<a name = start></a>
## Как запустить проект?
1. Установить Angular (Открыть терминал и прописать `npm install -g @angular/cli`)
2. Скачать проект, открыть его и прописать в консоли `npm install`
3. Прописать в консоли `ng serve`

<a name = stack></a>
## Stack-технологий
- Приложение написано на [Angular](https://angular.io/)
- В качестве СУБД использовалась [Firebase](https://firebase.google.com/)
  
<a name = func></a>
## Примерный функционал:
- Планирование отпуска
- Динамический расчёт отпуска на дату заявление на отпуск
- Реализация авторизации, регистрации
- Общий календарь с отпусками по отделам
- Система управления отделами и сотрудниками

<a name = participants></a>
## Участники
- Баянкин Даниил Антонович - РИ-220911
- Голубев Илья Дмитриевич - РИ-220934
- Рукавишников Александр Сергеевич - РИ-220948
- Куратор - Боярский Никита

<a name = grade></a>
## Таблица выполнения технического грейда приложения:
| Пункт ТЗ                                 | Решение                                                                                                                                                                                                                               |
|------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 3-4 реактивные формы + форма авторизации | src/app/pages/auth/components/login/login.component.ts <br/> src/app/pages/auth/components/register/register.component.ts <br/> src/app/pages/profile/view-models/profile-user-edit-form.view-model.ts <br/> Любая компонента диалога |
| 2-3 функциональных модуля                | src/app/pages/employees/modules/employees.module.ts <br/> src/app/pages/auth/public.module.ts <br/> src/app/shared/modules/material/material.module.ts                                                                                |
| 3 lazy-модуля для роутинга               | src/app/pages/employees/modules/employees-routes.ts <br/> src/app/pages/auth/public-routing.module.ts                                                                                                                                 |
| Простое внедрение зависимостей           | Любая компонента                                                                                                                                                                                                                      |
| Компоненты используют @Input @Output     | src/app/pages/calendar/children/calendar-header/calendar-header.component.ts <br/> А так же многие другие компоненты                                                                                                                  |
| Базовый rx/js                            | Почти везде                                                                                                                                                                                                                           |
| Паттерн фабрика                          | src/app/shared/services/loggers/logger-factory.service.ts                                                                                                                                                                             |
| Reusable компоненты                      | src/app/shared/components/*                                                                                                                                                                                                           |
| Передача параметров в роутингах          | используются во всех роутах для breadcrumbs                                                                                                                                                                                           |
| Guards                                   | src/app/pages/auth/guards <br/> src/app/pages/employees/guards/manager.guard.ts                                                                                                                                                       |
| 1-2 кастомные атрибутивные директивы     | src/app/shared/directives/phone-mask.directive.ts                                                                                                                                                                                     |
| 1-2 кастомных пайпа                      | src/app/shared/pipes/filter.pipe.ts                                                                                                                                                                                                   |
| Использование @ViewChild и @ViewChildren | src/app/pages/profile/profile.component.ts                                                                                                                                                                                            |
| Запросы на сервер                        | веб-сокеты firebase во всех сервисах                                                                                                                                                                                                  |
| MVVM                                     | src/app/pages/profile/view-models/profile-user-edit-form.view-model.ts                                                                                                                                                                |
| Сложное внедрение зависимостей           | src/app/app.config.ts                                                                                                                                                                                                                 |
| Breadcrumbs                              | src/app/shared/components/bread-crumb <br/> src/app/shared/services/bread-crumb.service.ts                                                                                                                                            |
| Использование @HostListener              | src/app/shared/directives/phone-mask.directive.ts                                                                                                                                                                                     |
| Global error handler                     | src/app/shared/services/global-error-handler.service.ts                                                                                                                                                                               |
| Динамический рендер компоненты           | Используется matDialog для динамического рендера диалоговых окон                                                                                                                                                                      |
| Скелетоны                                | src/app/shared/components/skeleton                                                                                                                                                                                                    |
| Адаптивность                             | Почти все страницы имеют адаптивность                                                                                                                                                                                                 |
| Angular Animations                       | src/app/pages/employees/children/department-page/department-page.component.ts                                                                                                                                                         |
| Глобальный сервис событий                | src/app/shared/services/global-event.service.ts                                                                                                                                                                                       |
