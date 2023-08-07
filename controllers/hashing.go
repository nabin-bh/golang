package controllers

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"fmt"
	"io"
)

func hashing() {
	input := []byte("Hello, world!")
	hash := sha256.Sum256(input)
	fmt.Printf("Input: %s\nSHA-256 Hash: %x\n", input, hash)
}

func symmetric() {
	key := []byte("0123456789abcdef0123456789abcdef") // 256-bit key
	plaintext := []byte("Hello, symmetric encryption!")

	// Create a new AES cipher block
	block, err := aes.NewCipher(key)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	// Generate a random IV (Initialization Vector)
	iv := make([]byte, aes.BlockSize)
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		fmt.Println("Error:", err)
		return
	}

	// Encrypt the plaintext
	encrypted := make([]byte, len(plaintext))
	cfb := cipher.NewCFBEncrypter(block, iv)
	cfb.XORKeyStream(encrypted, plaintext)

	fmt.Printf("Plaintext: %s\nEncrypted: %x\n", plaintext, encrypted)
}

func asymmetric() {
	// Generate RSA key pair
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		fmt.Println("Error generating private key:", err)
		return
	}

	// Extract public key
	publicKey := &privateKey.PublicKey

	// Encrypt a message using the public key
	message := []byte("Hello, asymmetric encryption!")
	ciphertext, err := rsa.EncryptPKCS1v15(rand.Reader, publicKey, message)
	if err != nil {
		fmt.Println("Error encrypting:", err)
		return
	}

	fmt.Printf("Original message: %s\nEncrypted message: %x\n", message, ciphertext)
}
