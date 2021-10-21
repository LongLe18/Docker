<h1><strong>Tutorial config nginx</strong></h1>
1. install git
	sudo apt update
	sudo apt install git
	git --version
2. NodeJS
	cd ~ 
	curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
	sudo bash nodesource_setup.sh
	sudo apt install nodejs
	node -v
3. MongoDB
	sudo apt update
	sudo apt upgrade
	sudo apt install mongodb
	sudo systemctl status mongodb
	
	sudo systemctl start mongodb.service
	sudo systemctl status mongodb
	sudo systemctl enable mongodb

4. Install Nginx
	sudo apt update
	sudo apt install nginx
	
	sudo ufw app list
	
	sudo ufw allow 'Nginx HTTP' (sudo ufw allow 5000)
	sudo ufw enable
	sudo ufw status
	
	sudo systemctl status nginx (statrt, stop restart, reload)
	curl -4 icanhazip.com
	http://your_server_ip (xem ip inet ens33: ip addr show => 192.168...) 
5. install tmux
	sudo apt install tmux
	tmux -V
	
6. Clone project
	git clone <link github> (Front-end va back-end)
	
	cd <folder front-end>
	npm install
	cd<folder back-end>
	npm install
	
	npm install -g nodemon pm2

7. Start project (Project cua t, cua thay keo xuong 8.)
	tmux new -s server
		ctrl + b + shift + 5(phim so o tren) (note: su dung 'ctrl b + mui ten' de di chuyen qua lai; 'exit' de tat; 'ctrl b + c: new windown; 'ctrl b + so^': chuyen giua cac window; 'ctrl b + d': detach; 								'tmux attach -t <name>': back lai tmux; 'tmux kill session -t <name>': delete session
	- 1 session: 2 cua so terminal: 
	+ cua so 1: cd Test/ -> sudo npm run build -> npm start
	+ cua so 2: cd Test/back-end -> npm start
	- ctr b + d
	
	tmux new -s config (config nginx)	
	sudo cp -r build/ /var/www/
	sudo chown -R $USER:$USER /var/www/build
	sudo chmod -R 755 /var/www/build

	sudo nano /etc/nginx/sites-available/default

	1. comment :root /var/www/html va index index.html ...
	2. location ~ ^/(api|images)/ {
		proxy_pass http://localhost:5000;
	     }
	3. location / {
		alias /var/www/build/;
		try_files $uri $uri/ =404;
	    }

	sudo rm /etc/nginx/sites-enabled/default
	sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/
	sudo nano /etc/nginx/nginx.conf 
	bỏ # server_names_hash_bucket_size 64
	sudo nginx -t
	sudo systemctl restart nginx

	mo browser: url: http://your_server_ip
	
8. Start project (cua thay)
	tmux new -s server
		ctrl + b + shift + 5: tao terminal moi(phim so o tren) (note: su dung 'ctrl b + mui ten' de di chuyen qua lai; 'exit' de tat; 'ctrl b + c: new windown; 'ctrl b + so^': chuyen giua cac window; 'ctrl b + d': 				detach; 	tmux attach -t <name>': back lai tmux; 'tmux kill session -t <name>': delete session
	- 1 session: 2 cua so terminal: 
	+ cua so 1: cd demo-app-frontend/ -> sudo npm run build -> npm start
	+ cua so 2: cd demo-app-backend-> sudo nano .env -> sửa: DB_URI=mongodb://localhost:27017/book ->npm start
	- ctr b + d
	
	tmux new -s config (config nginx)
	cd demo-app-backend	
	sudo cp -r build/ /var/www/book.com/
	sudo chown -R $USER:$USER /var/www/book.com/build
	sudo chmod -R 755 /var/www/book.com/build
	
	sudo rm /etc/nginx/sites-enabled/default
	sudo nano /etc/nginx/sites-available/book.com.conf

	server {
		listen 80;
		listen [::]:80;
		server_name book.com www.book.com;
		location ~ ^/(api|images)/ {
			proxy_pass http://localhost:8000;
		}
		
		location / {
			alias /var/www/book.com/build/;
			try_files $uri $uri/ =404;
		}
	}

	sudo ln -s /etc/nginx/sites-available/book.com.conf /etc/nginx/sites-enabled/
	sudo nano /etc/nginx/nginx.conf 
	bỏ # server_names_hash_bucket_size 64
	sudo nginx -t
	sudo systemctl restart nginx
	
	xem ip: ip addr show (xem ens33)

	Windows: 
		mo C:/Windows/System32/drivers/etc/hosts 
		them: <your_sv_ip> book.com
	mo browser: url: http://book.com
