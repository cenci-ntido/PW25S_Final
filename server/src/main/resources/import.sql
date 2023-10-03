INSERT INTO tb_user(display_name, username, password) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO tb_user(display_name, username, password) VALUES ('Teste', 'test','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO tb_account (saved_money, user_id, description) VALUES(1000, 1, 'Nubank');
INSERT INTO tb_account (saved_money, user_id, description) VALUES(100, 2, 'Nubank');
INSERT INTO tb_account (saved_money, user_id, description) VALUES(0, 1, 'Inter');
INSERT INTO tb_revenue ("date", received, value, account_id, account_id) VALUES('01/01/2023', false, 5000, 1, 1);
INSERT INTO tb_revenue ("date", received, value, account_id, account_id) VALUES('02/01/2023', false, 4000, 2, 2);
