
from selenium import webdriver
from selenium.webdriver.common.by import By
import os

driver = webdriver.Chrome()

path = os.path.abspath("app.html")
driver.get("file:///" + path.replace("\\", "/"))

# Test 1: Valid login
driver.find_element(By.ID, "username").send_keys("Shivani")
driver.find_element(By.ID, "password").send_keys("pass123")
driver.find_element(By.ID, "login").click()

welcome = driver.find_element(By.ID, "welcome")
assert welcome.text == "Welcome Shivani"
print("Test 1 Passed: Welcome username displayed")

# Test 2: Incorrect password
driver.find_element(By.ID, "username").clear()
driver.find_element(By.ID, "username").send_keys("Shivani")
driver.find_element(By.ID, "password").send_keys("wrong123")
driver.find_element(By.ID, "login").click()

error = driver.find_element(By.ID, "error")
password = driver.find_element(By.ID, "password")

assert error.is_displayed()
assert error.text == "Invalid username or password"
assert password.get_attribute("value") == ""

print("Test 2 Passed: Error displayed and password cleared")

driver.quit()
