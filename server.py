from flask import Flask, render_template, url_for, session, request, redirect
import requests
import data_manager


app = Flask(__name__)
app.config['SECRET_KEY'] = "Your_secret_string"
app.secret_key = 'whatever'


@app.route('/')
@app.route('/planets')
def planets_first_page():
    number = 1
    response = requests.get('https://swapi.co/api/planets/').json()
    result = response['results']

    return render_template('planets.html', result=result, number=number)


@app.route('/planets/<number>')
def planets_pages(number):
    response = requests.get("https://swapi.co/api/planets/?page=" + number).json()
    result = response['results']
    "resident_number = len(result['residents'])"
    number = int(number)

    return render_template('planets.html', result=result, number=number)


@app.route('/registration', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        user = data_manager.check_user(request.form['register_user_name'])
        if len(user) == 0:

            password = data_manager.hash_password(request.form['register_password'])

            login_name = request.form['register_user_name']
            print("registered")
            data_manager.register(login_name, password)

            return redirect(url_for('planets_first_page', already_used=False))
        else:
            return redirect(url_for('register', already_used=True))
    return render_template('registration.html', already_used=False)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_name = request.form['user_name']

        data = data_manager.login(user_name)
        if not data:
            return redirect(url_for('planets_first_page', log=False))
        user_id = data_manager.get_id_by_user_name(user_name)['user_id']
        session['user_name'] = user_name
        session['user_id'] = user_id

        log = data_manager.verify_password(request.form.to_dict()['password'], data[0]['password'])
        if log:

            return redirect(url_for('planets_first_page'))
        else:
            session.pop('user_name', None)
            session.pop('user_id', None)
            log = False
            return redirect(url_for('planets_first_page', log=False))
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('user_name', None)
    return redirect(url_for('planets_first_page'))


if __name__ == '__main__':
    app.run(debug=True,
            port=7000,
            host='0.0.0.0')
